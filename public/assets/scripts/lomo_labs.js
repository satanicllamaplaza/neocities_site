document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][name="filter"]');
  const container = document.getElementById('filter-form');
  const applyButton = container.querySelector('input[type="submit"]');

  // Track the order of selected filters
  const selectedFilters = [];
  let filterRecipe = [];

  function addFilterOptions(checkbox) {
    const filterName = checkbox.value;

    // Remove the filter if unchecked
    if (!checkbox.checked) {
      const existingOptions = document.getElementById(filterName + '-options');
      if (existingOptions) {
        container.removeChild(existingOptions);
      }

      // Remove from the selectedFilters array if index is not equal to nonexistent.
      const index = selectedFilters.indexOf(filterName);
      if (index !== -1) {
        selectedFilters.splice(index, 1);
      }

      // Reorder options based on selection order
      updateFilterOrder();
      return;
    }

    // Add to the array only if not already added
    if (!selectedFilters.includes(filterName)) {
      selectedFilters.push(filterName);
    }

    // Create the filter options
    const filterOptions = document.createElement('div');
    filterOptions.id = filterName + '-options';

    if (filterName === 'black_and_white') {
      filterOptions.innerHTML = `
        <h3>Black & White / Fade Options</h3>
        <label style="color: #8A2BE2;">How much should the film fade (1 - 100)</label>
        <input type="number" name="fade_intensity" min="0" max="100" value="100">
      `;
    } else if (filterName === 'expired_film') {
      filterOptions.innerHTML = `
        <h3>Expired Film Options</h3>
        <p>This filter has no controls. You are at the whim of the film.</p>
      `;
    } else if (filterName === 'flip_the_brownie') {
      filterOptions.innerHTML = `
        <h3>Flip the Brownie Options</h3>
        <p>Between 1 - 25 this effect will blur the edges.</p>
        <p>Between 30 - 100 this effect will fade the edges... kinda.</p>
        <label style="color: #8A2BE2;">How strong should the effect be (1 - 100)</label>
        <input type="number" name="blur" min="1" max="100" value="17">
      `;
    } else if (filterName === 'film_soup') {
      filterOptions.innerHTML = `
        <h3>Film Soup Options</h3>

        <label for="soup-select" style="color: #FF6347;">Select Your Film Soup:</label>
        <select id="soup-select" name="soup">
          <option value="beer">🍺 Beer</option>
          <option value="gin">🍸 Gin</option>
          <option value="rose">🍷 Rose</option>
          <option value="rum">🥃 Rum</option>
          <option value="whiskey">🥃 Whiskey</option>
        </select>

        <br><br>

        <label style="color: #8A2BE2;">How long do you want to soak the film (1 - 100):</label>
        <input type="number" name="soak_time" min="1" max="100" value="60">
      `;
    }

    // Always insert the new options *right before* the apply button
    container.insertBefore(filterOptions, applyButton);

    // Reorder the filters to match the selection order
    updateFilterOrder();
  }

  function updateFilterOrder() {
    // Clear existing filter options
    const existingOptions = container.querySelectorAll('.filter-options');
    existingOptions.forEach(opt => container.removeChild(opt));

    // Re-add them in the order of `selectedFilters`
    selectedFilters.forEach(filterName => {
      const filterOptions = document.getElementById(filterName + '-options');
      if (filterOptions) {
        container.insertBefore(filterOptions, applyButton);
      }
    });
  }

  function buildFilterRecipe() {
    filterRecipe = [];
    selectedFilters.forEach(filterName => {
      let filterDict = {};
      filterDict["filter_name"] = filterName;

      // Get the filter options div for the current filter
      const filterDiv = document.getElementById(filterName + '-options');
      console.log(filterDiv);  // Optional: Check what the filter div contains

      // Find all input elements within the filter options and capture their values
      const inputs = filterDiv.querySelectorAll('input, select');
      inputs.forEach(input => {
        const inputName = input.name;
        let inputValue = input.value;

        // For number inputs, ensure the value is parsed to an integer
        if (input.type === 'number') {
          inputValue = parseInt(inputValue, 10);

          // Check if the parsed value is NaN and handle it
          if (isNaN(inputValue)) {
            inputValue = parseInt(input.defaultValue, 10); // Set to a default value (or handle as necessary)
          }

          // Check if the value exceeds the allowed range and set to 100 or 0
          if (inputValue > 100) {
            inputValue = 100; // Max value
          } else if (inputValue < 0) {
            inputValue = 0; // Min value
          }

        }

        // Add the input's name and value to the filter dictionary
        filterDict[inputName] = inputValue;
      });

      // Add the filter dictionary to the filter recipe
      filterRecipe.push(filterDict);
    });

    // Log the filter recipe as a formatted JSON string for debugging
    console.log(JSON.stringify(filterRecipe, null, 2)); 
  }




  // Attach event listeners to each checkbox
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => addFilterOptions(checkbox));
  });

  applyButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('avatar');
    if (fileInput.files.length === 0) {
      alert('Please upload an image.');
      return;
    }

    if (selectedFilters.length === 0) {
      alert('Please select at least one filter.');
      return;
    }

    buildFilterRecipe(); // Build the filter JSON

    const formData = new FormData();
    
    // Append all uploaded images
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('images', fileInput.files[i]);
    }

    // Append filter recipe JSON
    formData.append('filterData', JSON.stringify(filterRecipe));

    try {
      const response = await fetch('https://lomo-labs.onrender.com', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      alert(`Filters applied! Download your images: ${result.download_url}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    }
  });

});


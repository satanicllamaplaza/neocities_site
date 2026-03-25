#!/usr/bin/env bash
set -e

MARKER=".optimized_files"

touch "$MARKER"

echo "Processing new JPG files..."
for file in *.jpg *.jpeg; do
    [ -e "$file" ] || continue

    if ! grep -Fxq "$file" "$MARKER"; then
        echo "Optimizing $file"
        mogrify -strip -interlace Plane -quality 75 "$file"
        echo "$file" >> "$MARKER"
    fi
done

echo "Processing new PNG files..."
for file in *.png; do
    [ -e "$file" ] || continue

    if ! grep -Fxq "$file" "$MARKER"; then
        echo "Optimizing $file"
        mogrify -strip -define png:compression-level=9 "$file"
        echo "$file" >> "$MARKER"
    fi
done

echo "Done."

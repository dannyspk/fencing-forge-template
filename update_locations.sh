#!/bin/bash

HERO_IMG="https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/647573426002f25603777d01_Ralph_8_BOB_Cedar-01-min.avif"
AUTH="surge:PZz3 KRZ5 RxOQ uDPu AlJt JYeh"
BASE_URL="https://docker-image-production-33c9.up.railway.app/wp-json/wp/v2/locations"

ids=(97 96 95 94 93 92 91 90 89 88 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51)

for id in "${ids[@]}"; do
    echo "Fetching title for ID: $id..."
    
    # Fetch title
    RESPONSE=$(curl -s -u "$AUTH" "$BASE_URL/$id")
    TITLE=$(echo "$RESPONSE" | jq -r '.title.rendered')
    
    if [ "$TITLE" == "null" ] || [ -z "$TITLE" ]; then
        echo "Error: Could not fetch title for ID $id. Skipping."
        continue
    fi

    echo "Updating $TITLE (ID: $id)..."

    # Post update
    curl -X POST "$BASE_URL/$id" \
      -u "$AUTH" \
      -H "Content-Type: application/json" \
      -d "{
        \"acf\": {
          \"city\": \"$TITLE\",
          \"state_abbr\": \"TX\",
          \"hero_headline\": \"$TITLE Fence Company\",
          \"hero_subheadline\": \"The #1 Rated Fence Contractor in $TITLE, TX\",
          \"intro_text\": \"We provide premium wood, iron, and chainlink fencing solutions for $TITLE homeowners.\",
          \"hero_image_url\": \"$HERO_IMG\"
        }
      }"
    
    echo -e "\nFinished updating ID: $id\n"
    # Small sleep to avoid rate limiting or hanging
    sleep 1
done

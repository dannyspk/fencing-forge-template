#!/bin/bash

HERO_IMG="https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/6638fb18912102b283b96fca_Ralph_8_BOB_Cedar_-_Top_Cap_-_Double_Trim_-_Corbels-25-min.avif"
LOGIN="surge:PZz3 KRZ5 RxOQ uDPu AlJt JYeh"
BASE_URL="https://docker-image-production-33c9.up.railway.app/wp-json/wp/v2/locations"

IDS=(97 96 95 94 93 92 91 90 89 88 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51)

for id in "${IDS[@]}"; do
    echo "Processing ID: $id..."
    
    # Fetch title (30s timeout)
    RESPONSE=$(curl -s --max-time 30 -u "$LOGIN" "$BASE_URL/$id")
    TITLE=$(echo "$RESPONSE" | jq -r '.title.rendered // empty')
    
    if [ -z "$TITLE" ]; then
        echo "Error: Could not fetch title for ID $id. Skipping."
        continue
    fi

    echo "Updating $TITLE (ID: $id)..."    # Post update (60s timeout)
    curl -X POST "$BASE_URL/$id" \
      --max-time 60 \
      -u "$LOGIN" \
      -H "Content-Type: application/json" \
      -d "{
        \"status\": \"publish\",
        \"acf\": {
          \"city\": \"$TITLE\",
          \"state_abbr\": \"TX\",
          \"hero_headline\": \"$TITLE Fence Company\",
          \"hero_subheadline\": \"The #1 Rated Fence Contractor in $TITLE, TX\",
          \"intro_text\": \"We provide premium wood, iron, and chainlink fencing solutions for $TITLE homeowners.\",
          \"hero_image_url\": \"$HERO_IMG\"
        }
      }"
    
    echo -e "\nFinished $id\n"
    sleep 1
done

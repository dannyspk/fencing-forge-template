<?php
/**
 * Plugin Name:  FenceCo CPTs & ACF Fields
 * Plugin URI:   https://github.com/dannyspk/fencing-forge-template
 * Description:  Registers the Service, Location, and Project custom post types
 *               and their ACF field groups. On save, pings the Next.js
 *               revalidation webhook so the static cache is refreshed instantly.
 * Version:      1.0.0
 * Author:       FenceCo
 * License:      GPL-2.0-or-later
 * Text Domain:  fenceco-cpt
 *
 * USAGE
 * ─────
 * 1. Upload this file to /wp-content/plugins/fenceco-cpt/fenceco-cpt.php
 * 2. Activate in WP Admin → Plugins
 * 3. Install ACF PRO (≥ 5.11) or the free "ACF to REST API" plugin so ACF
 *    fields are exposed in the REST API under the `acf` key.
 * 4. Add to wp-config.php (or set as environment variables):
 *
 *      define( 'FENCECO_NEXTJS_URL',    'https://your-vercel-app.vercel.app' );
 *      define( 'FENCECO_REVALIDATE_TOKEN', 'your-long-random-secret' );
 *
 *    These match the Next.js env vars:
 *      NEXT_PUBLIC_SITE_URL  →  FENCECO_NEXTJS_URL
 *      WP_REVALIDATE_TOKEN   →  FENCECO_REVALIDATE_TOKEN
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. REGISTER CUSTOM POST TYPES
// ─────────────────────────────────────────────────────────────────────────────

add_action( 'init', 'fenceco_register_cpts' );

function fenceco_register_cpts(): void {

    // ── SERVICE ───────────────────────────────────────────────────────────────
    register_post_type( 'service', [
        'labels'       => [
            'name'               => 'Services',
            'singular_name'      => 'Service',
            'add_new_item'       => 'Add New Service',
            'edit_item'          => 'Edit Service',
            'view_item'          => 'View Service',
            'search_items'       => 'Search Services',
            'not_found'          => 'No services found.',
            'not_found_in_trash' => 'No services found in trash.',
            'menu_name'          => 'Services',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,   // required for WP REST API + Gutenberg
        'rest_base'           => 'services',
        'has_archive'         => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-hammer',
        'supports'            => [ 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ],
        'rewrite'             => [ 'slug' => 'services', 'with_front' => false ],
    ] );

    // ── LOCATION ──────────────────────────────────────────────────────────────
    register_post_type( 'location', [
        'labels'       => [
            'name'               => 'Service Areas',
            'singular_name'      => 'Service Area',
            'add_new_item'       => 'Add New Service Area',
            'edit_item'          => 'Edit Service Area',
            'view_item'          => 'View Service Area',
            'search_items'       => 'Search Service Areas',
            'not_found'          => 'No service areas found.',
            'not_found_in_trash' => 'No service areas found in trash.',
            'menu_name'          => 'Service Areas',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'rest_base'           => 'locations',
        'has_archive'         => true,
        'menu_position'       => 6,
        'menu_icon'           => 'dashicons-location',
        'supports'            => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'rewrite'             => [ 'slug' => 'service-area', 'with_front' => false ],
    ] );

    // ── PROJECT ───────────────────────────────────────────────────────────────
    register_post_type( 'project', [
        'labels'       => [
            'name'               => 'Projects',
            'singular_name'      => 'Project',
            'add_new_item'       => 'Add New Project',
            'edit_item'          => 'Edit Project',
            'view_item'          => 'View Project',
            'search_items'       => 'Search Projects',
            'not_found'          => 'No projects found.',
            'not_found_in_trash' => 'No projects found in trash.',
            'menu_name'          => 'Projects',
        ],
        'public'              => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'rest_base'           => 'projects',
        'has_archive'         => true,
        'menu_position'       => 7,
        'menu_icon'           => 'dashicons-images-alt2',
        'supports'            => [ 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ],
        'rewrite'             => [ 'slug' => 'projects', 'with_front' => false ],
    ] );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. REGISTER ACF FIELD GROUPS (runs only when ACF is active)
// ─────────────────────────────────────────────────────────────────────────────

add_action( 'acf/init', 'fenceco_register_acf_fields' );

function fenceco_register_acf_fields(): void {

    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    // ── SERVICE fields ────────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_fenceco_service',
        'title'    => 'Service Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'service' ] ] ],
        'show_in_rest' => true,
        'fields'   => [
            [
                'key'   => 'field_service_tagline',
                'label' => 'Tagline',
                'name'  => 'tagline',
                'type'  => 'text',
                'instructions' => 'Short label shown above the title, e.g. "Most Popular"',
            ],
            [
                'key'   => 'field_service_short_description',
                'label' => 'Short Description',
                'name'  => 'short_description',
                'type'  => 'textarea',
                'rows'  => 2,
                'instructions' => 'Used in meta description and hero subtitle (≤ 160 chars)',
            ],
            [
                'key'   => 'field_service_hero_image_url',
                'label' => 'Hero Image URL',
                'name'  => 'hero_image_url',
                'type'  => 'url',
                'instructions' => 'Fallback URL when no Featured Image is set.',
            ],
            [
                'key'   => 'field_service_hero_image_alt',
                'label' => 'Hero Image Alt Text',
                'name'  => 'hero_image_alt',
                'type'  => 'text',
            ],
            [
                'key'          => 'field_service_price_tiers',
                'label'        => 'Pricing Tiers',
                'name'         => 'price_tiers',
                'type'         => 'repeater',
                'min'          => 0,
                'max'          => 5,
                'layout'       => 'table',
                'button_label' => 'Add Tier',
                'sub_fields'   => [
                    [ 'key' => 'field_tier_label',       'label' => 'Label',        'name' => 'label',       'type' => 'text'  ],
                    [ 'key' => 'field_tier_price_range',  'label' => 'Price Range',  'name' => 'price_range', 'type' => 'text', 'instructions' => 'e.g. $2–4k' ],
                    [ 'key' => 'field_tier_linear_feet',  'label' => 'Linear Feet',  'name' => 'linear_feet', 'type' => 'text', 'instructions' => 'e.g. 50 Linear Feet' ],
                ],
            ],
            [
                'key'          => 'field_service_styles',
                'label'        => 'Featured Product Styles',
                'name'         => 'styles',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Add Style',
                'instructions' => 'Shown in the "Explore Our Options" grid below the hero.',
                'sub_fields'   => [
                    [ 'key' => 'field_style_name',      'label' => 'Name',      'name' => 'name',      'type' => 'text' ],
                    [ 'key' => 'field_style_image_url', 'label' => 'Image URL', 'name' => 'image_url', 'type' => 'url' ],
                    [
                        'key'          => 'field_style_bullets',
                        'label'        => 'Bullet Points',
                        'name'         => 'bullets',
                        'type'         => 'repeater',
                        'layout'       => 'table',
                        'button_label' => 'Add Bullet',
                        'sub_fields'   => [
                            [ 'key' => 'field_style_bullet_text', 'label' => 'Text', 'name' => 'text', 'type' => 'text' ],
                        ],
                    ],
                ],
            ],
            [
                'key'          => 'field_service_upgrades',
                'label'        => 'Upgrade Add-Ons',
                'name'         => 'upgrades',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Add Upgrade',
                'instructions' => 'Shown in the "Upgrades" tabbed section.',
                'sub_fields'   => [
                    [ 'key' => 'field_upgrade_name',        'label' => 'Name',        'name' => 'name',        'type' => 'text' ],
                    [ 'key' => 'field_upgrade_description', 'label' => 'Description', 'name' => 'description', 'type' => 'textarea', 'rows' => 3 ],
                    [ 'key' => 'field_upgrade_image_url',   'label' => 'Image URL',   'name' => 'image_url',   'type' => 'url' ],
                ],
            ],
            [
                'key'          => 'field_service_features',
                'label'        => 'Feature Bullets',
                'name'         => 'features',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Add Feature',
                'sub_fields'   => [
                    [ 'key' => 'field_feature_label',  'label' => 'Label',  'name' => 'label',  'type' => 'text' ],
                    [ 'key' => 'field_feature_detail', 'label' => 'Detail', 'name' => 'detail', 'type' => 'text' ],
                ],
            ],
            [
                'key'          => 'field_service_why_us_items',
                'label'        => '"Why Us" Tiles (overrides global)',
                'name'         => 'why_us_items',
                'type'         => 'repeater',
                'layout'       => 'table',
                'max'          => 8,
                'button_label' => 'Add Tile',
                'instructions' => 'Leave empty to use the global Why-Us tiles from the Home page.',
                'sub_fields'   => [
                    [ 'key' => 'field_service_why_icon',  'label' => 'Emoji / Icon', 'name' => 'icon',  'type' => 'text' ],
                    [ 'key' => 'field_service_why_title', 'label' => 'Title',         'name' => 'title', 'type' => 'text' ],
                ],
            ],
            [
                'key'          => 'field_service_faqs',
                'label'        => 'FAQs',
                'name'         => 'faqs',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Add FAQ',
                'sub_fields'   => [
                    [ 'key' => 'field_faq_q', 'label' => 'Question', 'name' => 'question', 'type' => 'text' ],
                    [ 'key' => 'field_faq_a', 'label' => 'Answer',   'name' => 'answer',   'type' => 'textarea', 'rows' => 3 ],
                ],
            ],
        ],
    ] );

    // ── LOCATION fields ───────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_fenceco_location',
        'title'    => 'Location Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'location' ] ] ],
        'show_in_rest' => true,
        'fields'   => [
            [ 'key' => 'field_loc_city',             'label' => 'City',              'name' => 'city',             'type' => 'text' ],
            [ 'key' => 'field_loc_county',           'label' => 'County',            'name' => 'county',           'type' => 'text', 'instructions' => 'e.g. Dallas County' ],
            [ 'key' => 'field_loc_state_abbr',       'label' => 'State Abbr.',       'name' => 'state_abbr',       'type' => 'text', 'default_value' => 'TX' ],
            [ 'key' => 'field_loc_hero_headline',    'label' => 'Hero Headline',     'name' => 'hero_headline',    'type' => 'text' ],
            [ 'key' => 'field_loc_hero_subheadline', 'label' => 'Hero Sub-headline', 'name' => 'hero_subheadline', 'type' => 'text' ],
            [ 'key' => 'field_loc_hero_image_url',   'label' => 'Hero Image URL',     'name' => 'hero_image_url',   'type' => 'url' ],
            [ 'key' => 'field_loc_intro_text',       'label' => 'Intro Text',        'name' => 'intro_text',       'type' => 'textarea', 'rows' => 3 ],
            [
                'key'          => 'field_loc_faqs',
                'label'        => 'City FAQs',
                'name'         => 'faqs',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Add FAQ',
                'sub_fields'   => [
                    [ 'key' => 'field_loc_faq_q', 'label' => 'Question', 'name' => 'question', 'type' => 'text' ],
                    [ 'key' => 'field_loc_faq_a', 'label' => 'Answer',   'name' => 'answer',   'type' => 'textarea', 'rows' => 3 ],
                ],
            ],
            [
                'key'          => 'field_loc_nearby_cities',
                'label'        => 'Nearby City Slugs',
                'name'         => 'nearby_cities',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Add City',
                'instructions' => 'WP slugs of sibling location CPT posts, e.g. "plano"',
                'sub_fields'   => [
                    [ 'key' => 'field_loc_city_slug', 'label' => 'Slug', 'name' => 'slug', 'type' => 'text' ],
                ],
            ],
        ],
    ] );

    // ── PROJECT fields ────────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_fenceco_project',
        'title'    => 'Project Details',
        'location' => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'project' ] ] ],
        'show_in_rest' => true,
        'fields'   => [
            [ 'key' => 'field_proj_linear_feet',   'label' => 'Linear Feet',    'name' => 'linear_feet',   'type' => 'text' ],
            [ 'key' => 'field_proj_location_city', 'label' => 'Location City',  'name' => 'location_city', 'type' => 'text', 'instructions' => 'e.g. Dallas, Plano' ],
            [ 'key' => 'field_proj_service_type',  'label' => 'Service (slug)', 'name' => 'service_type',  'type' => 'text', 'instructions' => 'Slug of the related Service CPT, e.g. wood-fences' ],
        ],
    ] );

    // ── HOME PAGE fields ──────────────────────────────────────────────────────
    acf_add_local_field_group( [
        'key'      => 'group_fenceco_home',
        'title'    => 'Home Page Settings',
        'location' => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
        'show_in_rest' => true,
        'fields'   => [
            [ 'key' => 'field_home_hero_headline',    'label' => 'Hero Headline',       'name' => 'hero_headline',    'type' => 'text' ],
            [ 'key' => 'field_home_hero_subheadline', 'label' => 'Hero Sub-headline',   'name' => 'hero_subheadline', 'type' => 'text' ],
            [ 'key' => 'field_home_hero_cta_primary', 'label' => 'CTA Primary Label',   'name' => 'hero_cta_primary', 'type' => 'text', 'default_value' => 'Get a Free Estimate' ],
            [ 'key' => 'field_home_hero_image_url',   'label' => 'Hero Image URL',      'name' => 'hero_image_url',   'type' => 'url' ],
            [ 'key' => 'field_home_hero_image_alt',   'label' => 'Hero Image Alt Text', 'name' => 'hero_image_alt',   'type' => 'text' ],
            [ 'key' => 'field_home_phone_primary',    'label' => 'Primary Phone',       'name' => 'phone_primary',    'type' => 'text' ],
            [ 'key' => 'field_home_phone_secondary',  'label' => 'Secondary Phone',     'name' => 'phone_secondary',  'type' => 'text' ],
            [ 'key' => 'field_home_email',            'label' => 'Email Address',       'name' => 'email',            'type' => 'email' ],
            [ 'key' => 'field_home_address',          'label' => 'Business Address',    'name' => 'address',          'type' => 'text' ],
            [
                'key'          => 'field_home_why_us_items',
                'label'        => '"Why Us" Tiles',
                'name'         => 'why_us_items',
                'type'         => 'repeater',
                'layout'       => 'table',
                'max'          => 8,
                'button_label' => 'Add Tile',
                'sub_fields'   => [
                    [ 'key' => 'field_why_icon',        'label' => 'Emoji / Icon', 'name' => 'icon',        'type' => 'text' ],
                    [ 'key' => 'field_why_title',       'label' => 'Title',        'name' => 'title',       'type' => 'text' ],
                    [ 'key' => 'field_why_description', 'label' => 'Description',  'name' => 'description', 'type' => 'text' ],
                ],
            ],
        ],
    ] );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. REVALIDATION WEBHOOK — ping Next.js on CPT save
// ─────────────────────────────────────────────────────────────────────────────

add_action( 'save_post', 'fenceco_trigger_revalidation', 20, 3 );

/**
 * When a Service, Location, or Project is published/updated, ping the
 * Next.js /api/revalidate endpoint so ISR cache is cleared immediately.
 *
 * @param int      $post_id  Post ID.
 * @param \WP_Post $post     Post object.
 * @param bool     $update   Whether this is an update.
 */
function fenceco_trigger_revalidation( int $post_id, \WP_Post $post, bool $update ): void {

    // Only trigger for our CPTs on published posts.
    $watched_types = [ 'service', 'location', 'project', 'page' ];
    if ( ! in_array( $post->post_type, $watched_types, true ) ) {
        return;
    }
    if ( $post->post_status !== 'publish' ) {
        return;
    }
    // Skip auto-saves and revisions.
    if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
        return;
    }

    $nextjs_url = defined( 'FENCECO_NEXTJS_URL' ) ? rtrim( FENCECO_NEXTJS_URL, '/' ) : '';
    $token      = defined( 'FENCECO_REVALIDATE_TOKEN' ) ? FENCECO_REVALIDATE_TOKEN : '';

    if ( empty( $nextjs_url ) || empty( $token ) ) {
        return; // constants not configured — skip silently
    }

    // Map WP post type → Next.js type slug expected by /api/revalidate.
    $type_map = [
        'service'  => 'service',
        'location' => 'location',
        'project'  => 'project',
        'page'     => 'home',
    ];
    $type = $type_map[ $post->post_type ] ?? null;
    if ( ! $type ) {
        return;
    }

    $body = wp_json_encode( [
        'type' => $type,
        'slug' => $post->post_name,
    ] );

    wp_remote_post(
        $nextjs_url . '/api/revalidate',
        [
            'method'    => 'POST',
            'timeout'   => 5,
            'blocking'  => false, // fire-and-forget, don't slow down save
            'headers'   => [
                'Content-Type'       => 'application/json',
                'x-revalidate-token' => $token,
            ],
            'body'      => $body,
        ]
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ADMIN NOTICE — remind editors to configure constants
// ─────────────────────────────────────────────────────────────────────────────

add_action( 'admin_notices', 'fenceco_admin_notice_config' );

function fenceco_admin_notice_config(): void {
    if ( defined( 'FENCECO_NEXTJS_URL' ) && defined( 'FENCECO_REVALIDATE_TOKEN' ) ) {
        return; // all good
    }
    $screen = get_current_screen();
    if ( ! $screen || $screen->id !== 'plugins' ) {
        return; // only show on Plugins page
    }
    ?>
    <div class="notice notice-warning is-dismissible">
        <p>
            <strong>FenceCo CPTs:</strong>
            Add <code>FENCECO_NEXTJS_URL</code> and <code>FENCECO_REVALIDATE_TOKEN</code>
            to your <code>wp-config.php</code> to enable automatic Next.js cache revalidation on post save.
        </p>
    </div>
    <?php
}

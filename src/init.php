<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package pricing
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function pricing_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'my_block-pricing-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);



	wp_enqueue_style('tr-bootstrap', plugins_url( 'assets/css/bootstrap.min.css', dirname( __FILE__ ) ) );

	wp_enqueue_style('icofont', plugins_url( 'assets/css/icofont.css', dirname( __FILE__ ) ) );
	wp_enqueue_style('icomoon', plugins_url( 'assets/css/icomoon.css', dirname( __FILE__ ) ) );
	wp_enqueue_style('fontawesome', plugins_url( 'assets/css/fontawesome.css', dirname( __FILE__ ) ) );


	wp_enqueue_script('bootstrap-script',  plugins_url( 'assets/js/bootstrap.min.js', dirname( __FILE__ ) ), array('jquery'),'1.0.0',true);

}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'pricing_block_assets',10000);

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function pricing_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'my_block-pricing-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'my_block-pricing-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'pricing_editor_assets' );




if ( !function_exists( 'pricing_blocks_category' ) ) {
    /**
     * Add our custom block category for Stackable blocks.
     *
     * @since 0.6
     */
    function pricing_blocks_category( $categories, $post )
    {
        return array_merge( $categories, array( array(
            'slug'  => 'pricing-blocks',
            'title' => __( 'Pricing Blocks - Gutenberg Blocks', 'pricing-blocks' ),
        ) ) );
    }
    
    add_filter(
        'block_categories',
        'pricing_blocks_category',
        10,
        2
    );
}

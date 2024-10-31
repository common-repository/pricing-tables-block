const { __ } = wp.i18n;

const { Fragment } = wp.element;

import icon from './icon';

const {
	InspectorControls,
	PanelColorSettings,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	ButtonGroup,
	IconButton,
	SelectControl,
} = wp.components;

const MAX_POSTS_COLUMNS = 4;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const hasTables = Array.isArray( attributes.tables ) && attributes.tables.length;
	const { style } = props.attributes;

	return (
		<Fragment>
			<InspectorControls>
					
				<PanelBody title={ __( 'Pricing Table settings' ) }>
				
				<SelectControl
							label={__('Style')}
							value={attributes.style}
							onChange={value =>
								setAttributes({ style: value })
							}
							options={['style1', 'style2' , 'style3', 'style4', 'style5'].map(
								a => {
									return {
										value: a,
										label: __(
											a[0].toUpperCase() + a.slice(1)
										)
									};
								}
							)}
						/>
						
						
					<RangeControl
						label={ __( 'Columns' ) }
						min={ 1 }
						max={ ! hasTables ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, attributes.tables.length ) }
						value={ attributes.columns }
						onChange={ ( columns ) => setAttributes( { columns } ) }
					/>
			
					
					<ToggleControl
						label={ __( 'Box Shadow' ) }
						checked={ !! attributes.boxShadow }
						help={ __( 'Applies a subtle box shadow effect.' ) }
						onChange={ () => setAttributes( { boxShadow: ! attributes.boxShadow } ) }
					/>
						
					{attributes.style == 'style1' && (
						<TextControl
						label={ __( 'Featured Text' ) }
						help={ __( 'Appears as badge over the featured plan.' ) }
						value={ attributes.featured_text }
						onChange={ ( value ) => setAttributes( { featured_text: value } ) }
						/>
						
						
					)}
					
					{attributes.style == 'style1' && (
						<PanelColorSettings
						title={ __( 'Button BG' ) }
						initialOpen={ false }
						colorSettings={ [
							
							{
								value: attributes.price2_btn_bg,
								onChange: ( price2_btn_bg ) => ( setAttributes( { price2_btn_bg } ) ),
								label: __( 'Background Color' ),
							},
						] }
						/>
						
					)}
					
					{attributes.style == 'style1' && (
						<PanelColorSettings
							title={ __( 'Text Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.textColor,
									onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
						
						
					)}
					
					{attributes.style == 'style1' && (
						<PanelColorSettings
							title={ __( 'Background Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.backgroundColor,
									onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
									label: __( 'BG Color' ),
								},
							] }
							/>
						
						
					)}
					
					
					{attributes.style == 'style2' && (
					
						<PanelColorSettings
							title={ __( 'Title BG' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.title2_bg,
									onChange: ( title2_bg ) => ( setAttributes( { title2_bg } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
					
					)}

					{attributes.style == 'style2' && (
						
						<PanelColorSettings
						title={ __( 'Button BG' ) }
						initialOpen={ false }
						colorSettings={ [
							
							{
								value: attributes.price2_btn_bg,
								onChange: ( price2_btn_bg ) => ( setAttributes( { price2_btn_bg } ) ),
								label: __( 'Background Color' ),
							},
						] }
						/>
					
					)}
					
					{attributes.style == 'style2' && (
					
						<PanelColorSettings
							title={ __( 'Text Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.textColor,
									onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
					
					)}
					
					{attributes.style == 'style2' && (
					
						<PanelColorSettings
							title={ __( 'Background Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.backgroundColor,
									onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
									label: __( 'BG Color' ),
								},
							] }
							/>
					
					)}
					
					
					
					
					
					{attributes.style == 'style3' && (
					
						<PanelColorSettings
							title={ __( 'Circle Shape BG' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.circle_shape,
									onChange: ( circle_shape ) => ( setAttributes( { circle_shape } ) ),
									label: __( 'Circle Shape BG Color' ),
								},
							] }
							/>
					
					)}
					
					{attributes.style == 'style3' && (
					
						<PanelColorSettings
							title={ __( 'Text Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.price3_text_color,
									onChange: ( price3_text_color ) => ( setAttributes( { price3_text_color } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
					
					)}
					
					{attributes.style == 'style3' && (
					
						<PanelColorSettings
							title={ __( 'Background Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.backgroundColor,
									onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
									label: __( 'BG Color' ),
								},
							] }
							/>
					
					)}
					
					
					
					
					
					{attributes.style == 'style4' && (
					
						<PanelColorSettings
							title={ __( 'Text Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.textColor,
									onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
					
					)}
					
					{attributes.style == 'style4' && (
						
						<PanelColorSettings
						title={ __( 'Button BG' ) }
						initialOpen={ false }
						colorSettings={ [
							
							{
								value: attributes.price4_btn_bg,
								onChange: ( price4_btn_bg ) => ( setAttributes( { price4_btn_bg } ) ),
								label: __( 'Background Color' ),
							},
						] }
						/>
					
					)}
					
					{attributes.style == 'style4' && (
					
						<PanelColorSettings
							title={ __( 'Background Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.backgroundColor,
									onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
									label: __( 'BG Color' ),
								},
							] }
							/>
					
					)}
					
					
					{attributes.style == 'style5' && (
					
						<PanelColorSettings
							title={ __( 'Background Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.backgroundColor,
									onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
									label: __( 'BG Color' ),
								},
							] }
						/>
					
					)}
					
					{attributes.style == 'style5' && (
						
						<PanelColorSettings
						title={ __( 'Button BG' ) }
						initialOpen={ false }
						colorSettings={ [
							
							{
								value: attributes.price5_btn_bg,
								onChange: ( price5_btn_bg ) => ( setAttributes( { price5_btn_bg } ) ),
								label: __( 'Background Color' ),
							},
						] }
						/>
					
					)}
					
					{attributes.style == 'style5' && (
					
						<PanelColorSettings
							title={ __( 'Text Color' ) }
							initialOpen={ false }
							colorSettings={ [
								
								{
									value: attributes.textColor,
									onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
									label: __( 'Text Color' ),
								},
							] }
							/>
					
					)}
					
					
					{attributes.style == 'style1' && (
						<TextControl
						label={ __( 'Featured Text' ) }
						help={ __( 'Appears as badge over the featured plan.' ) }
						value={ attributes.price5_section }
						//onChange={ ( value ) => setAttributes( { featured_text: value } ) }
						/>
						
						
					)}
					
				
					
					
					
				</PanelBody>
				
			
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;

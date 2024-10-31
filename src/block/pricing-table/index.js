import classnames from 'classnames';
import Controls from './controls';
import Edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const {
	RichText,
} = wp.editor;

registerBlockType( 'pricing-tables/pricing-table', {
	title: __( 'Pricing Table' ),
	category: 'pricing-blocks',
	description: __( 'Add a pricing table block to showcase different plans and offers.' ),
	icon,
	keywords: [
		__( 'pricing table' ),
		__( 'comparison' ),
	],
	customCategory: 'smashing-blocks',
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		
		featured_text: {
			type: 'string',
			default: 'Recommended',
		},
		
		textColor: {
			type: 'string',
			default: '#23282d',
		},
		backgroundColor: {
			type: 'string',
		},
		tables: {
			type: 'array',
			default: [],
		},
		fullWidthButtons: {
			type: 'boolean',
			default: false,
		},
		boxShadow: {
			type: 'boolean',
			default: true,
		},
		style: {
			type: 'string',
			default: 'style1'
		},
		price2_btn_bg: {
			type: 'string',
			default: 'rgb(40, 224, 216)'
		},
		title2_bg: {
			type: 'string',
			default: 'rgb(40, 224, 216)'
		},
		price3_class: {
			type: 'string',
			default: 'price3_class'
		},
		
		
		circle_shape: {
			type: 'string',
			default: '#edf1fd'
		},
		price3_text_color: {
			type: 'string',
			default: '#353535'
		},
		
		price4_btn_bg: {
			type: 'string',
			default: '#313131'
		},
		
		price5_btn_bg: {
			type: 'string',
			default: '#E54148'
		},
		
		
	},

	edit( props ) {
		return (
			<Fragment>
				<Controls { ...props } />

				<Edit { ...props } />
			</Fragment>
		);
	},

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-smashing-pricing-table';
		const hasFeatured = attributes.tables.some( ( table ) => table.featured );
		const cls = (attributes.style == 'style5') ? 'style5' : 'style-5';
		const style2 = (attributes.style == 'style2') ? 'style2' : 'style-2';
		
		return (
		     
			<div className={ classnames( className, `columns-${ attributes.columns } `, {
				'has-shadow': attributes.boxShadow,
				'has-featured': hasFeatured,
				'has-full-width-button': attributes.fullWidthButtons,
				
			} ) }>
				{
					( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (
						<div
							key={ i }
							className={ classnames( `${ className }__table style-${cls} style-${style2}`, {
								'is-featured': table.featured,
							} ) }
							style={ {
								backgroundColor: attributes.backgroundColor,
								color: attributes.textColor,
							} }
						>
							{ ( attributes.featured_text ) && ( table.featured ) &&
								<span className={ `${ className }__featured_text` }>{ attributes.featured_text }</span>
							}
							
						{attributes.style === 'style1' && (
							<div className={ `${ className }__header` }>
								<RichText.Content
									tagName="h3"
									className={ `${ className }__title` }
									value={ table.title }
									style={ {
										color: attributes.textColor,
									} }
								/>
							</div>
						)}
						
						
						{attributes.style === 'style1' && (
							<div className={ `${ className }__price` }>
								<RichText.Content
									tagName="div"
									className={ `${ className }__price__amount` }
									value={ table.price }
									style={ {
										color: attributes.textColor,
									} }
								/>
								<RichText.Content tagName="div" className={ `${ className }__price__term` } value={ table.price_term } />
							</div>
						)}
						
						{attributes.style === 'style1' && (
													
						    <RichText.Content tagName="ul" className={ `${ className }__features` } value={ table.features } 
							
							style={ {
													
									color: attributes.textColor,
								} }
							
							/>	
							
						)}
						
						{attributes.style === 'style1' && (
													
						   <div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
													backgroundColor: attributes.price2_btn_bg,
													color: attributes.textColor,
											} }
									/>
								</div>
							</div>	
							
						)}
						
						
						
						

						{attributes.style === 'style2' && (
							<div className={ `${ className }__header` }>
								<RichText.Content
									tagName="h3"
									className={ `${ className }__title pricing2` }
									value={ table.title }
									style={ {
												color: attributes.textColor,
												backgroundColor: attributes.title2_bg,
										} }
								/>
							</div>
						)}	
						
						
						{attributes.style === 'style2' && (
							<div className={ `${ className }__price price2` }>
								<RichText.Content
									tagName="div"
									className={ `${ className }__price__amount` }
									value={ table.price }
									style={ {
										color: attributes.textColor,
									} }
								/>
								<RichText.Content tagName="span" className={ `${ className }__price__term` } value={ table.price_term } 
								style={ {
										color: attributes.textColor,
									} }
								/>
							</div>
						)}
						
						{attributes.style === 'style2' && (
													
						    <RichText.Content tagName="ul" className={ `${ className }__features price-feature2` } value={ table.features } 
							style={ {
									color: attributes.textColor,
								} }
							/>	
							
						)}
						
						{attributes.style === 'style2' && (
													
						   <div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link price2_btn"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
											color: attributes.textColor,
											backgroundColor: attributes.price2_btn_bg,
										} }
									/>
								</div>
							</div>	
							
						)}
						
						
						
						
						{attributes.style === 'style3' && (
								
						   <div 
						   className="circle-shape rounded-circle position-absolute"
						   style={ {
										backgroundColor: attributes.circle_shape,
									} }
						   
						   ></div>
									
						)}
						
						{attributes.style === 'style3' && (
							<div className={ `${ className }__price price3 text-center position-relative pricing-table-top` }>
								<RichText.Content
									tagName="h2"
									className={ `${ className }__price__amount amount3 text-active pt-3 font-weight-bold mb-0 bold` }
									value={ table.price }
									style={ {
										color: attributes.price3_text_color,
									} }
								/>
								<RichText.Content tagName="p" className={ `${ className }__price__term month3` } value={ table.price_term } />
							</div>
						)}
						
						{attributes.style === 'style3' && (
							<div className={ `${ className }__header` }>
								<RichText.Content
									tagName="h3"
									className={ `${ className }__title pb-3 title3` }
									value={ table.title }
									style={ {
										color: attributes.price3_text_color,
									} }
								/>
							</div>
						)}
						
						
						{attributes.style === 'style3' && (
													
						    <RichText.Content tagName="ul" className={ `${ className }__features features3` } value={ table.features } 
							style={ {
									color: attributes.price3_text_color,
								} }
							/>	
							
						)}
						
						{attributes.style === 'style3' && (
													
						   <div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link price-btn3"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
											color: attributes.price3_text_color,
										} }
									/>
								</div>
							</div>	
							
						)}
						
						
						
					{attributes.style === 'style4' && (
						<div className={ `${ className }__icon` }>
							<span className={ table.icon }></span>
						</div>
					)}	
						{attributes.style === 'style4' && (
							<div className={ `${ className }__header` }>
								<RichText.Content
									tagName="h3"
									className={ `${ className }__title title4` }
									value={ table.title }
									style={ {
										color: attributes.textColor,
									} }
								/>
							</div>
						)}
						
						
						{attributes.style === 'style4' && (
							<div className={ `${ className }__price price_style4` }>
								<RichText.Content
									tagName="div"
									className={ `${ className }__price__amount price4` }
									value={ table.price }
									style={ {
										color: attributes.textColor,
									} }
								/>
								<RichText.Content tagName="div" className={ `${ className }__price__term month4` } value={ table.price_term } />
							</div>
						)}
						
						{attributes.style === 'style4' && (
													
						    <RichText.Content tagName="ul" className={ `${ className }__features features4` } value={ table.features } 
							
							style={ {
													
									color: attributes.textColor,
								} }
							
							/>	
							
						)}
						
						{attributes.style === 'style4' && (
													
						   <div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link price-btn4 mt-2 text-active text-uppercase"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
													backgroundColor: attributes.price4_btn_bg,
													color: attributes.textColor,
											} }
									/>
								</div>
							</div>	
							
						)}
							


						{attributes.style === 'style5' && (
							<div className="price-overlay"></div>
						)}	
						{attributes.style === 'style5' && (
							<div className={ `${ className }__header pricing-table-top` }>
								<RichText.Content
									tagName="h4"
									className={ `${ className }__title title4` }
									value={ table.title }
									style={ {
										color: attributes.textColor,
									} }
								/>
								<RichText.Content
									tagName="span"
									className={ `${ className }__price__amount price5` }
									value={ table.price }
									style={ {
										color: attributes.textColor,
									} }
								/>
							</div>
						)}	
						
						{attributes.style === 'style5' && (
													
						    <RichText.Content tagName="ul" className={ `${ className }__featuressss features5` } value={ table.features } 
							
							style={ {
													
									color: attributes.textColor,
								} }
							
							/>	
							
						)}
						
						{attributes.style === 'style5' && (
													
						   <div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
										style={ {
													backgroundColor: attributes.price5_btn_bg,
													color: attributes.textColor,
											} }
									/>
								</div>
							</div>	
							
						)}

							
							
							
						</div>
					) ) ) : null
				}
			</div>
		);
	},
} );

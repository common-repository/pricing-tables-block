import classnames from 'classnames';
//import { STYLES, getStyleNameFromClasses } from './helper';
const { __ } = wp.i18n;

const {
	Fragment,
	Component,
} = wp.element;

const {
	IconButton,
	Dashicon,
	withFocusOutside,
} = wp.components;

const {
	RichText,
	URLInput,
} = wp.editor;

const EnhancedComponent = withFocusOutside(
	class Edit extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				focusedIndex: null,
				selectedTable: null,
			};
		}

		handleFocusOutside() {
			this.setState( { focusedIndex: false } );
		}

		stopKeyPropagation = ( event ) => event.stopPropagation();

		render() {
			const { attributes, setAttributes, className, isSelected } = this.props;
			const hasFeatured = attributes.tables.some( ( table ) => table.featured );
			const cls = (attributes.style == 'style5') ? 'style5' : 'style-5';
			const style2 = (attributes.style == 'style2') ? 'style2' : 'style-2';
			return (

				<Fragment>
					<div className={ classnames( className, `columns-${ attributes.columns }`, {
						'has-shadow': attributes.boxShadow,
						'has-featured': hasFeatured,
						'has-full-width-button': attributes.fullWidthButtons,

					} ) }>

						{


							( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (

									<div

										key={ i }

											className={ classnames( `${ className }__table style-${cls} style-${style2}`, {
												'is-selected': ( isSelected && this.state.selectedTable === i ),
												'is-featured': table.featured,
											} ) }

										onClick={ () => this.setState( { selectedTable: i } ) }
										tabIndex="-1"
										role="textbox"
										onKeyDown={ () => false }
										style={ {

												backgroundColor: attributes.backgroundColor,
												color: attributes.textColor,



										} }

									>

									{ ( attributes.featured_text ) && ( table.featured ) &&
										<span className={ `${ className }__featured_text` }>{ attributes.featured_text }</span>
									}
									{ ( isSelected && this.state.selectedTable === i ) &&
										<div className="block-library-gallery-item__inline-menu">


											<IconButton
												icon="no-alt"
												onClick={ () => {
													const tables = [ ...attributes.tables ];

													setAttributes( { tables: tables.filter( ( el, index ) => ! ( index === i ) ) } );
												} }
												className="blocks-gallery-item__remove"
												label={ __( 'Remove Table' ) }
											/>
										</div>
									}

									{ ( isSelected && this.state.selectedTable === i ) &&
										<div className="block-library-gallery-item__inline-menu_left">

											<IconButton
												label={ __( 'Mark as featured' ) }
												className="blocks-gallery-item__remove item-left"
												onClick={ () => {
													const tables = [ ...attributes.tables ];
													// Cache orginal featured state.
													const originalState = tables[ i ].featured;
													tables.map( ( t ) => t.featured = false );
													// Restore orginal state if already defined, else true.
													tables[ i ].featured = ( originalState ? ! originalState : true );
													setAttributes( { tables } );
												} }
												icon={ table.featured ? <i className="fa fa-bookmark" /> : <i className="fa fa-bookmark" /> }
											/>
										</div>
									}

								{attributes.style === 'style1' && (

									<div className={ `${ className }__header` }>
										<RichText
											tagName="h3"
											placeholder={ __( 'Title...' ) }
											className={ `${ className }__title` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: attributes.textColor,
											} }
										/>

									</div>

								)}

								{attributes.style === 'style1' && (

								<div className={ `${ className }__price` }>
										<RichText
											tagName="div"
											placeholder="$10"
											className={ `${ className }__price__amount` }
											value={ table.price }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											keepPlaceholderOnFocus
											style={ {
												color: attributes.textColor,
											} }
										/>
										<RichText
											tagName="div"
											placeholder="per month"
											className={ `${ className }__price__term` }
											value={ table.price_term }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price_term = value;
												setAttributes( { tables } );
											} }
											keepPlaceholderOnFocus
											inlineToolbar
											style={ {
												color: attributes.textColor,
											} }
										/>
									</div>
								)}


								{attributes.style === 'style1' && (
									<RichText
										className={ `${ className }__features` }
										tagName="ul"
										multiline="li"
										placeholder={ __( 'Enter plan features...' ) }
										value={ table.features }
										onChange={ ( value ) => {
											const tables = [ ...attributes.tables ];
											tables[ i ].features = value;
											setAttributes( { tables } );
										} }
										inlineToolbar
										style={ {
												color: attributes.textColor,
											} }
									/>
								)}



								{attributes.style === 'style1' && (

									<div className={ `${ className }__footer` }>
										<span
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button is-style-squared"
										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__link' ) }
												keepPlaceholderOnFocus
												style={ {
													backgroundColor: attributes.price2_btn_bg,
													color: attributes.textColor,
												} }
												inlineToolbar
											/>
										</span>

										{ ( this.state.focusedIndex === i ) && (
											<form
												className="block-library-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>

									)}







								{attributes.style === 'style2' && (

									<div className={ `${ className }__header` }>
										<RichText
											tagName="h3"
											placeholder={ __( 'Title...' ) }
											className={ `${ className }__title pricing2` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: attributes.textColor,
												backgroundColor: attributes.title2_bg,
											} }
										/>

									</div>

								)}


								{attributes.style === 'style2' && (

									<div className={ `${ className }__price price2` }>
										<RichText
											tagName="div"
											placeholder="$10"
											className={ `${ className }__price__amount` }
											value={ table.price }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											keepPlaceholderOnFocus
											style={ {
												color: attributes.textColor,
											} }
										/>
										<RichText
											tagName="span"
											placeholder="per month"
											className={ `${ className }__price__term` }
											value={ table.price_term }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price_term = value;
												setAttributes( { tables } );
											} }
											keepPlaceholderOnFocus
											inlineToolbar
											style={ {
												color: attributes.textColor,
											} }
										/>
									</div>
								)}

								{attributes.style === 'style2' && (
										<RichText
											className={ `${ className }__features price-feature2` }
											tagName="ul"
											multiline="li"
											placeholder={ __( 'Enter plan features...' ) }
											value={ table.features }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].features = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											style={ {
												color: attributes.textColor,
											} }
										/>
								)}


								{attributes.style === 'style2' && (

									<div className={ `${ className }__footer ` }>
										<span
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button is-style-squared price2_btn"
											style={ {
													color: attributes.textColor,
													backgroundColor: attributes.price2_btn_bg
												} }

										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__linkss ' ) }
												keepPlaceholderOnFocus

												inlineToolbar


											/>
										</span>

										{ ( this.state.focusedIndex === i ) && (
											<form
												className="block-library-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>

									)}




								{attributes.style === 'style3' && (

									<div className="circle-shape rounded-circle position-absolute"
									style={ {
										backgroundColor: attributes.circle_shape,
									} }
									></div>

								)}


								{attributes.style === 'style3' && (

									<div className={ `${ className }__price price3 text-center position-relative pricing-table-top` }>
										<RichText
											tagName="h2"
											placeholder="$10"
											className={ `${ className }__price__amount amount3 text-active pt-3 font-weight-bold mb-0 bold` }
											value={ table.price }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											keepPlaceholderOnFocus
											style={ {
												color: attributes.price3_text_color,
											} }
										/>
										<RichText
											tagName="p"
											placeholder="per month"
											className={ `${ className }__price__term month3` }
											value={ table.price_term }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price_term = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: attributes.price3_text_color,
											} }
											keepPlaceholderOnFocus
											inlineToolbar

										/>
									</div>


								)}

								{attributes.style === 'style3' && (
									<div className={ `${ className }__header ` }>
										<RichText
											tagName="h4"
											placeholder={ __( 'Title...' ) }
											className={ `${ className }__title pb-3 title3` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: attributes.price3_text_color,
											} }
										/>
									</div>

								)}


								{attributes.style === 'style3' && (
										<RichText
											className={ `${ className }__features pl-0 mt-4 mb-4 features3` }
											tagName="ul"
											multiline="li"
											placeholder={ __( 'Enter plan features...' ) }
											value={ table.features }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].features = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											style={ {
												color: attributes.price3_text_color,
											} }
										/>
								)}

								{attributes.style === 'style3' && (

									<div className={ `${ className }__footer` }>
										<button
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button is-style-squared price-btn3 mt-2 text-active text-uppercase "
										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__link btn3' ) }
												keepPlaceholderOnFocus
												style={ {

													color: attributes.price3_text_color,

												} }
												inlineToolbar
											/>
										</button>

										{ ( this.state.focusedIndex === i ) && (
											<form
												className="block-library-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>

									)}




								{attributes.style === 'style4' && (
									<div className={ `${ className }__icon` }>
											<RichText
												tagName="span"
												placeholder={ __( 'Icon...' ) }
												className={ table.icon }
												value={ table.icon }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].icon = value;
													setAttributes( { tables } );
												} }
												style={ {
													color: attributes.textColor,
												} }
											/>

										</div>


								)}

								{attributes.style === 'style4' && (

									<div className={ `${ className }__header` }>
										<RichText
											tagName="h2"
											placeholder={ __( 'Title...' ) }
											className={ `${ className }__title title4` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
											style={ {
												color: attributes.textColor,
											} }
										/>

									</div>

								)}

								{attributes.style === 'style4' && (

								<div className={ `${ className }__price price_style4` }>
										<RichText
											tagName="h3"
											placeholder="$10"
											className={ `${ className }__price__amount price4` }
											value={ table.price }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											keepPlaceholderOnFocus
											style={ {
												color: attributes.textColor,
											} }
										/>
										<RichText
											tagName="span"
											placeholder="per month"
											className={ `${ className }__price__term month4` }
											value={ table.price_term }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].price_term = value;
												setAttributes( { tables } );
											} }
											keepPlaceholderOnFocus
											inlineToolbar
											style={ {
												color: attributes.textColor,
											} }
										/>
									</div>
								)}

								{attributes.style === 'style4' && (
										<RichText
											className={ `${ className }__features` }
											tagName="ul"
											multiline="li"
											placeholder={ __( 'Enter plan features...' ) }
											value={ table.features }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].features = value;
												setAttributes( { tables } );
											} }
											inlineToolbar
											style={ {
												color: attributes.price3_text_color,
											} }
										/>
								)}


								{attributes.style === 'style4' && (

									<div className={ `${ className }__footer` }>
										<span
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button is-style-squared price-btn4 mt-2 text-active text-uppercase "
										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__link' ) }
												keepPlaceholderOnFocus
												style={ {
													backgroundColor: attributes.price4_btn_bg,
													color: attributes.textColor,
												} }
												inlineToolbar
											/>
										</span>

										{ ( this.state.focusedIndex === i ) && (
											<form
												className="block-library-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>

									)}






									{attributes.style === 'style5' && (
										<div className="price-overlay"></div>
									)}

									{attributes.style === 'style5' && (

										<div className={ `${ className }__header pricing-table-top` }>
											<RichText
												tagName="h4"
												placeholder={ __( 'Title...' ) }
												className={ `${ className }__title` }
												value={ table.title }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].title = value;
													setAttributes( { tables } );
												} }
												style={ {
													color: attributes.textColor,
												} }
											/>

											<RichText
												tagName="span"
												placeholder="$10/month"
												className={ `${ className }__price__amount price5` }
												value={ table.price }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].price = value;
													setAttributes( { tables } );
												} }
												inlineToolbar
												keepPlaceholderOnFocus
												style={ {
													color: attributes.textColor,
												} }
											/>


										</div>

									)}

									{attributes.style === 'style5' && (

											<RichText
												className={ `${ className }__featuresss features5` }
												tagName="ul"
												multiline="li"
												placeholder={ __( 'Enter plan features...' ) }
												value={ table.features }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].features = value;
													setAttributes( { tables } );
												} }
												inlineToolbar
												style={ {
													color: attributes.price3_text_color,
												} }
											/>

									)}


									{attributes.style === 'style5' && (

										<div className={ `${ className }__footer` }>
											<span
												role="button"
												onClick={ () => this.setState( { focusedIndex: i } ) }
												onKeyPress={ this.stopKeyPropagation }
												tabIndex={ i }
												className="wp-block-button is-style-squared"
											>
												<RichText
													tagName="span"
													placeholder={ __( 'Add text…' ) }
													value={ table.buttonText }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonText = value;
														setAttributes( { tables } );
													} }
													formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
													className={ classnames( 'wp-block-button__link' ) }
													keepPlaceholderOnFocus
													style={ {
														backgroundColor: attributes.price5_btn_bg,
														color: attributes.textColor,
													} }
													inlineToolbar
												/>
											</span>

											{ ( this.state.focusedIndex === i ) && (
												<form
													className="block-library-button__inline-link"
													onSubmit={ ( event ) => event.preventDefault() }>
													<Dashicon icon="admin-links" />
													<URLInput
														value={ table.buttonURL }
														onChange={ ( value ) => {
															const tables = [ ...attributes.tables ];
															tables[ i ].buttonURL = value;
															setAttributes( { tables } );
														} }
													/>
													<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
												</form>
											) }
										</div>

									)}






								</div>
							) ) ) : null
						}


					</div>




					{ isSelected &&
						<div className="blocks-gallery-item">
							<IconButton
								icon="insert"
								isDefault
								isLarge
								className="block-library-gallery-add-item-button"
								onClick={ () => {
									const tables = [ ...attributes.tables ];

									tables.push( {
										title: '',
										icon: '',
										description: '',
										price: '',
										price_term: '',
										features: [],
										buttonText: 'Purchase',
									} );

									setAttributes( { tables } );
								} }
							>
								{ __( 'Add new table' ) }
							</IconButton>
						</div>
					}
				</Fragment>










			);
		}
	}
);

export default EnhancedComponent;

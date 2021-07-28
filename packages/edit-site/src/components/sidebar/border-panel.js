/**
 * WordPress dependencies
 */
import {
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalBorderStyleControl as BorderStyleControl,
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';
import {
	__experimentalProgressiveDisclosurePanel as ProgressiveDisclosurePanel,
	__experimentalProgressiveDisclosurePanelItem as ProgressiveDisclosurePanelItem,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useSetting } from '../editor/utils';

const MIN_BORDER_WIDTH = 0;

// Defining empty array here instead of inline avoids unnecessary re-renders of
// color control.
const EMPTY_ARRAY = [];

export function useHasBorderPanel( { supports, name } ) {
	const controls = [
		useHasBorderColorControl( { supports, name } ),
		useHasBorderRadiusControl( { supports, name } ),
		useHasBorderStyleControl( { supports, name } ),
		useHasBorderWidthControl( { supports, name } ),
	];

	return controls.every( Boolean );
}

function useHasBorderColorControl( { supports, name } ) {
	return (
		useSetting( 'border.customColor', name ) &&
		supports.includes( 'borderColor' )
	);
}

function useHasBorderRadiusControl( { supports, name } ) {
	return (
		useSetting( 'border.customRadius', name ) &&
		supports.includes( 'borderRadius' )
	);
}

function useHasBorderStyleControl( { supports, name } ) {
	return (
		useSetting( 'border.customStyle', name ) &&
		supports.includes( 'borderStyle' )
	);
}

function useHasBorderWidthControl( { supports, name } ) {
	return (
		useSetting( 'border.customWidth', name ) &&
		supports.includes( 'borderWidth' )
	);
}

export default function BorderPanel( {
	context: { supports, name },
	getStyle,
	setStyle,
} ) {
	const units = useCustomUnits( {
		availableUnits: useSetting( 'spacing.units' ) || [ 'px', 'em', 'rem' ],
	} );

	// Border width.
	const showBorderWidth = useHasBorderWidthControl( { supports, name } );
	const borderWidth = getStyle( name, 'borderWidth' );
	const resetBorderWidth = () => setStyle( name, 'borderWidth', undefined );
	const hasBorderWidth = () => !! borderWidth;

	// Border style.
	const showBorderStyle = useHasBorderStyleControl( { supports, name } );
	const borderStyle = getStyle( name, 'borderStyle' );
	const resetBorderStyle = () => setStyle( name, 'borderStyle', undefined );
	const hasBorderStyle = () => !! borderStyle;

	// Border color.
	const colors = useSetting( 'color.palette' ) || EMPTY_ARRAY;
	const disableCustomColors = ! useSetting( 'color.custom' );
	const disableCustomGradients = ! useSetting( 'color.customGradient' );
	const showBorderColor = useHasBorderColorControl( { supports, name } );
	const borderColor = getStyle( name, 'borderColor' );
	const resetBorderColor = () => setStyle( name, 'borderColor', undefined );
	const hasBorderColor = () => !! borderColor;

	// Border radius.
	const showBorderRadius = useHasBorderRadiusControl( { supports, name } );
	const borderRadius = getStyle( name, 'borderRadius' );
	const resetBorderRadius = () => setStyle( name, 'borderRadius', undefined );
	const hasBorderRadius = () => {
		if ( typeof borderRadius === 'object' ) {
			return Object.entries( borderRadius ).some( Boolean );
		}

		return !! borderRadius;
	};

	const resetAll = () => {
		resetBorderColor();
		resetBorderRadius();
		resetBorderStyle();
		resetBorderWidth();
	};

	return (
		<ProgressiveDisclosurePanel
			label={ __( 'Border options' ) }
			title={ __( 'Border' ) }
			resetAll={ resetAll }
		>
			{ showBorderWidth && (
				<ProgressiveDisclosurePanelItem
					hasValue={ hasBorderWidth }
					label={ __( 'Width' ) }
					onDeselect={ resetBorderWidth }
					isShownByDefault={ true }
				>
					<UnitControl
						value={ borderWidth }
						label={ __( 'Width' ) }
						min={ MIN_BORDER_WIDTH }
						onChange={ ( value ) => {
							setStyle( name, 'borderWidth', value || undefined );
						} }
						units={ units }
					/>
				</ProgressiveDisclosurePanelItem>
			) }
			{ showBorderStyle && (
				<ProgressiveDisclosurePanelItem
					hasValue={ hasBorderStyle }
					label={ __( 'Style' ) }
					onDeselect={ resetBorderStyle }
					isShownByDefault={ true }
				>
					<BorderStyleControl
						value={ borderStyle }
						onChange={ ( value ) =>
							setStyle( name, 'borderStyle', value )
						}
					/>
				</ProgressiveDisclosurePanelItem>
			) }
			{ showBorderColor && (
				<ProgressiveDisclosurePanelItem
					hasValue={ hasBorderColor }
					label={ __( 'Color' ) }
					onDeselect={ resetBorderColor }
					isShownByDefault={ true }
				>
					<ColorGradientControl
						label={ __( 'Color' ) }
						value={ borderColor }
						colors={ colors }
						gradients={ undefined }
						disableCustomColors={ disableCustomColors }
						disableCustomGradients={ disableCustomGradients }
						onColorChange={ ( value ) =>
							setStyle( name, 'borderColor', value )
						}
					/>
				</ProgressiveDisclosurePanelItem>
			) }
			{ showBorderRadius && (
				<ProgressiveDisclosurePanelItem
					hasValue={ hasBorderRadius }
					label={ __( 'Radius' ) }
					onDeselect={ resetBorderRadius }
					isShownByDefault={ true }
				>
					<BorderRadiusControl
						values={ borderRadius }
						onChange={ ( value ) =>
							setStyle( name, 'borderRadius', value )
						}
					/>
				</ProgressiveDisclosurePanelItem>
			) }
		</ProgressiveDisclosurePanel>
	);
}

/**
 * WordPress dependencies
 */
import { useConstrainedTabbing } from '@wordpress/compose';
import { Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import EmbeddedAdminContext from '../embedded-admin-context';

/**
 * Placeholder for use in blocks. Creates an admin styling context and a tabbing
 * context in the block editor's writing flow.
 *
 * @param {Object} props
 * @param {Object} props.wrapperProps
 *
 * @return {WPComponent} The component
 */
export default function IsolatedPlaceholder( { wrapperProps, ...props } ) {
	return (
		<EmbeddedAdminContext { ...wrapperProps }>
			<Placeholder
				{ ...props }
				role="dialog"
				aria-label={ props.label }
				ref={ useConstrainedTabbing() }
			/>
		</EmbeddedAdminContext>
	);
}

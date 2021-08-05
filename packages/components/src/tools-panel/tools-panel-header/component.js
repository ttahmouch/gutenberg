/**
 * WordPress dependencies
 */
import { check, moreHorizontal } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DropdownMenu from '../../dropdown-menu';
import MenuGroup from '../../menu-group';
import MenuItem from '../../menu-item';
import { useToolsPanelHeader } from './hook';
import { MENU_STATES } from '../utils';
import { contextConnect } from '../../ui/context';

const ToolsPanelHeader = ( props, forwardedRef ) => {
	const {
		hasMenuItems,
		header,
		menuItems,
		menuLabel,
		resetAll,
		toggleItem,
		...headerProps
	} = useToolsPanelHeader( props );

	if ( ! header ) {
		return null;
	}

	return (
		<h2 { ...headerProps } ref={ forwardedRef }>
			{ header }
			{ hasMenuItems && (
				<DropdownMenu icon={ moreHorizontal } label={ menuLabel }>
					{ ( { onClose } ) => (
						<>
							<MenuGroup label={ __( 'Display options' ) }>
								{ Object.entries( menuItems ).map(
									( [ label, itemState ] ) => {
										const isSelected =
											itemState === MENU_STATES.CHECKED;
										const isDisabled =
											itemState === MENU_STATES.DISABLED;

										return (
											<MenuItem
												key={ label }
												icon={ isSelected && check }
												isSelected={ isSelected }
												disabled={ isDisabled }
												onClick={ () => {
													toggleItem( label );
													onClose();
												} }
												role="menuitemcheckbox"
											>
												{ label }
											</MenuItem>
										);
									}
								) }
							</MenuGroup>
							<MenuGroup>
								<MenuItem
									onClick={ () => {
										resetAll();
										onClose();
									} }
								>
									{ __( 'Reset all' ) }
								</MenuItem>
							</MenuGroup>
						</>
					) }
				</DropdownMenu>
			) }
		</h2>
	);
};

const ConnectedToolsPanelHeader = contextConnect(
	ToolsPanelHeader,
	'ToolsPanelHeader'
);

export default ConnectedToolsPanelHeader;

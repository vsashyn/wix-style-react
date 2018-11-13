/**
 * Storybook list of stories
 *
 * order is reflected in storybook sidebar
 */

import '../../stories/Introduction';
import '../../stories/Composite'; // TODO: Move to introduction

// 1. Foundations
import '../../stories/Typography/TypographyStory.js'; // 1.2 Typography
import '../../stories/Label.story.js'; // 1.2 + Label
import '../../stories/NewIcons'; // 1.4 Icons

import '../../stories/Loader.story.js'; // 1.5 Loader
import '../../stories/LinearProgressBar.story.js'; // 1.6 LinearProgressBar
import '../../stories/CircularProgressBar.story.js'; // 1.7 LinearProgressBar
import '../../stories/ScrollBar'; // 1.8 ScrollBar

// 2. Layout
import '../../stories/Page/index.story.js'; // 2.5 Page
import '../../stories/PageHeader/index.story.js'; // 2.5 + PageHeader
import '../../stories/Page/FullPageExample.js'; // 2.5 + Page Example
import '../../stories/EmptyState/EmptyState.story'; // 2.6 EmptyState
import '../../stories/StatsWidget'; // 2.7 StatsWidget
import '../../stories/AddItem/AddItem.story'; // 2.8 AddItem
import '../../stories/Grid';
import '../../stories/Card';

// 3. Inputs
import '../../stories/TextField'; // 3.1 Text Field
import '../../stories/TextArea'; // 3.2a Text Area
import '../../stories/RichTextAreaComposite'; // 3.2b RichTextAreaComposite
import '../../stories/RichTextArea/RichTextArea.story.js'; // 3.2b + RichTextArea
import '../../stories/FieldWithSelectionComposite'; // 3.3 Field With Selection
import '../../stories/TimeInput.story.js'; // 3.4 TimeInput
import '../../stories/DatePicker.story.js'; // 3.6 DatePicker
import '../../stories/Range'; // 3.7 Range
import '../../stories/MultiSelect'; // 3.8 Tags
import '../../stories/MultiSelectComposite'; // 3.8 + MultiSelectComposite
import '../../stories/Search/index.story'; // 3.9 Search
import '../../stories/ImageViewer/index.story'; // 3.10 ImageViewer
import '../../stories/FilePicker'; // 3.10 + FilePicker
import '../../stories/GoogleAddressInput'; // 3.11 GoogleAddressInput
import '../../stories/Calendar/index.story'; // 3.13 Calendar

// 4. Selection
import '../../stories/Dropdown/DropdownStory.js'; // 4.1 Dropdown
import '../../stories/AutoComplete'; // 4.1 + AutoComplete
import '../../stories/AutoCompleteComposite'; // 4.1 + AutoCompleteComposite
import '../../stories/InputWithOptions'; // 4.1 + InputWithOptions
import '../../stories/IconWithOptions'; // 4.1 + IconWithOptions
import '../../stories/ButtonWithOptions'; // 4.1 + ButtonWithOptions
import '../../stories/MultiSelectCheckbox/index.story.js'; // 4.1 + MultiSelectCheckbox
import '../../stories/Checkbox.story.js'; // 4.2 Checkbox
import '../../stories/RadioGroup.story.js'; // 4.3 RadioGroup
import '../../stories/ToggleSwitch.story'; // 4.4 ToggleSwitch
import '../../stories/Slider'; // 4.7 Slider
import '../../stories/GoogleAddressInputWithLabel'; // 4.8 Google address input

// 5. Buttons
import '../../stories/ButtonLayout.story.js'; // 5.0 ButtonLayout
import '../../stories/Button/standard.story.js'; // 5.1 Standard
import '../../stories/Button/white.story.js'; // 5.2 White
import '../../stories/Button/icon.story.js'; // 5.3 Icon
import '../../stories/Button/error.story.js'; // 5.4 Error
import '../../stories/Button/premium.story.js'; // 5.5 Premium
import '../../stories/Button/transparent.story.js'; // 5.6 Transparent
import '../../stories/Button/close.story.js'; // 5.7 Close
import '../../stories/TextLink/index.story.js'; // 5.8 Text Link

// 6. Navigation
import '../../stories/SideMenu'; // 6.1 SideMenu
import '../../stories/Breadcrumbs/index.story.js'; // 6.2 + Breadcrumbs
import '../../stories/Tabs'; // 6.3 Tabs

// 7. Tooltips
// 7.1 Tooltip, 7.2 Popover, 7.3 Popover Menu
import '../../stories/Tooltip/Composite/CompositeStory';

// 8. Notification Bars
// 8.1 Standard, 8.2 Error, 8.3 Success, 8.4 Warning, 8.5 Premium
import '../../stories/Notification';
import '../../stories/FloatingHelper/FloatingHelper.story.js'; // 8.6 FloatingHelper
import '../../stories/FloatingHelperContent/FloatingHelperContent.story.js'; // 8.6 + FloatingHelper.Content
import '../../stories/SectionHelper/SectionHelper.story.js'; // 8.7 SectionHelper

// 9. Modals
import '../../stories/MessageBox';
import '../../stories/Modal';
import '../../stories/EndorseContentLayout';

// 10. Tables
import '../../stories/DataTable'; // 10.1 DataTable
import '../../stories/Table'; // 10.1 Table
import '../../stories/TableToolbar/ToolbarStory.js'; // 10.1 Table -> TableToolbar
import '../../stories/TableActionCell/TableActionCell.story'; // 10.1 Table -> TableActionCell

// 11. Pickers and Selectors
import '../../stories/DropdownLayout'; // 11.1 DropdownLayout
import '../../stories/EditableSelector'; // 11.2 EditableSelector
import '../../stories/ModalSelectorLayout.story.js'; // 11.3 ModalSelectorLayout
import '../../stories/ColorPicker.story.js'; // 11.5 Color Picker

// 12. Other
import '../../stories/Badge/index.story'; // 12.1 Badge
import '../../stories/BadgeSelect/index.story.js'; // 12.2 BadgeSelect
import '../../stories/CounterBadge'; //12.3 CounterBadge
import '../../stories/FullTextView.story.js'; //12.4 FullTextView
import '../../stories/Tag.story.js'; // 12.5 Tag
import '../../stories/Highlighter.story.js'; // Highlighter

// Components API
import '../../stories/components/Dropdown/Dropdown.story.js';
import '../../stories/FormField/FormField.story.js';
import '../../stories/GenericModalLayout/GenericModalLayout.story.js';
import '../../stories/Heading/index.story';
import '../../stories/Input';
import '../../stories/InputArea/index.story.js';
import '../../stories/Layout/index.story.js';
import '../../stories/Layout';
import '../../stories/Text/index.story';
import '../../stories/Collapse.story';

// Styling
import '../../stories/Typography/TypographyClassesStory';

// WIP
import '../../stories/WIP';
import '../../stories/DragAndDrop/DragAndDrop.js';
import '../../stories/Builders/BadgeSelectItemBuilder';

// TPA
import '../../stories/TPA/Button';
import '../../stories/TPA/FloatingTabs';
import '../../stories/TPA/TextLink';
import '../../stories/TPA/Input';
import '../../stories/TPA/Label';

// Tests
import '../../stories/Typography/TypographyTestStories';
import '../../stories/Page/PageTestStories.js'; // Tests/2.5 + Page/
import '../../stories/PageHeader/PageHeaderTestStories.js'; // Tests/2.5 + PageHeader/
import '../../stories/Tooltip/Composite/PopoverMenuRegressionTest.js'; // Tests/7.3. Popover Menu/
import '../../stories/Button/ButtonTestStory';

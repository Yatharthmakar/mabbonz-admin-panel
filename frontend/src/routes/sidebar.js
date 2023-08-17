/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
// import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
// import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
// import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
// import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
// import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
// import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
// import UserIcon from '@heroicons/react/24/outline/UserIcon'
// import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
// import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
// import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
// import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
// import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
// import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
// import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
// import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/priceandtagapp',
    icon: <PaperAirplaneIcon className={iconClasses} />,
    name: 'Price & Tag App',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Documentation', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
        name: 'Getting Started', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
        name: 'Components',
      }
    ]
  },

]

export default routes



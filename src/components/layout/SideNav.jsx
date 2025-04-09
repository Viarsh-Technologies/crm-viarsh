import NavigationLink from './NavigationLink'
import iconDashboard from '../../assets/icon-dashboard.svg'
import iconID from '../../assets/icon-idcard.svg'
import iconBrief from '../../assets/icon-briefcase.svg'
import iconCalendar from '../../assets/icon-calendar.svg'
import iconTeam from '../../assets/icon-team.svg'
import iconInbox from '../../assets/icon-inbox.svg'
import iconPendingMail from '../../assets/icon-pending-mail.svg'

import iconSettings from '../../assets/icon-setting.svg'
import iconLogout from '../../assets/icon-logout.svg'

const SideNav = () => {
    return (
        <nav className="flex flex-col h-full">
            <ul className='flex flex-col gap-2'>
                <li>
                    <NavigationLink icon={iconDashboard} to="/dashboard"/>
                </li>
                <li><NavigationLink icon={iconBrief} to="/projects"/></li>
                <li><NavigationLink icon={iconID} to="/contacts"/></li>
                <li><NavigationLink icon={iconCalendar} to="/aiagent"/></li>
                <li><NavigationLink icon={iconTeam} to="/leads"/></li>
            </ul>

            <span className='border-b border-gray-400 h-1 my-5 w-full flex'></span>

            {/* Secondary Navigation Links */}
            <ul className='flex flex-col gap-2 min-h-[120px]'>
                <li>
                    <NavigationLink icon={iconInbox} to="/inbox"/>
                </li>
                <li>
                    <NavigationLink icon={iconPendingMail} to="/pendingApproval"/>
                </li>
            </ul>

            <div className="flex-grow"></div>

           
                

                <ul className='flex flex-col gap-1 '>
                <li>
                    <NavigationLink icon={iconSettings} to="/settings"/>
                </li>
                <li><NavigationLink icon={iconLogout} to="/logout"/></li>
                
            </ul>
            



            
        </nav>
    )
}

export default SideNav

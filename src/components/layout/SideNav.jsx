import React from 'react'
import NavigationLink from './NavigationLink'

import iconDashboard from '../../assets/icon-dashboard.svg'
import iconID from '../../assets/icon-idcard.svg'
import iconBrief from '../../assets/icon-briefcase.svg'
import iconTeam from '../../assets/icon-team.svg'
import iconInbox from '../../assets/icon-inbox.svg'
import iconPendingMail from '../../assets/icon-pending-mail.svg'
import iconSettings from '../../assets/icon-setting.svg'
import Logout from '../../assets/logout.svg'
import Question from '../../assets/question.svg'
import Vector from '../../assets/layer.svg'
import Bot from '../../assets/Capa.png'
import Notifications from '../../assets/notifications.svg'
import Warn from '../../assets/warn.svg'

const SideNav = () => {
    return (
        <nav className="flex flex-col h-full">
            {/* Primary Navigation */}
            <ul className="flex flex-col ">
                <li><NavigationLink icon={iconDashboard} to="/dashboard" /></li>
                <li><NavigationLink icon={iconBrief} to="/projects" /></li>
                <li><NavigationLink icon={iconID} to="/contacts" /></li>
                <li><NavigationLink icon={Vector} to="/aiagent" /></li>
                <li><NavigationLink icon={Bot} to="/chatbot" /></li>
                <li><NavigationLink icon={iconTeam} to="/leads" /></li>
                <li><NavigationLink icon={Question} to="/pagenotfound" /></li>
            </ul>

            <hr className="my-2 border-gray-400" />

            {/* Secondary Links Group 1 */}
            <ul className="flex flex-col ">
                <li><NavigationLink icon={iconInbox} to="/inbox" /></li>
                <li><NavigationLink icon={iconPendingMail} to="/pendingApproval" /></li>
            </ul>

            <div className="flex-grow"></div>

            <hr className="my-2 border-gray-400" />

            {/* Secondary Links Group 2 */}
            <ul className="flex flex-col ">
                <li><NavigationLink icon={Notifications} to="/pagenotfound" /></li>
                <li><NavigationLink icon={Warn} to="/pagenotfound" /></li>
            </ul>

            <hr className="my-2 border-gray-400" />

            {/* Footer Navigation */}
            <ul className="flex flex-col gap-0">
                <li><NavigationLink icon={iconSettings} to="/settings" /></li>
                <li><NavigationLink icon={Logout} to="/logout" /></li>
            </ul>
        </nav>
    )
}

export default SideNav

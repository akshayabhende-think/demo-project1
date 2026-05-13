import React from 'react'
import MainLayout from './layout/MainLayout'
import Inquiries from './pages/Inquiries'
import {Routes, Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Client from './pages/Client'
import Prospect from './pages/Prospect'
import EditProspect from './pages/EditProspect'
import AddProspect from './pages/AddProspect'
import ProspectDetail from './pages/ProspectDetail'
import Groups from './pages/Groups'
import AddGroup from './pages/AddGroup'
import Scheduling from './pages/Scheduling'
import Task from './pages/Task'
import Toxicology from './pages/Toxicology'
import Reports from './pages/Reports'
import Billing from './pages/Billing'
import GenerateSuperbill from './pages/GenerateSuperbill'
import Settings from './pages/Settings'
import AppointmentSettings from './pages/AppointmentSettings'
import ProviderAccountSettings from './pages/ProviderAccountSettings'
import PracticeSettings from './pages/PracticeSettings'
import PatientCommunications from './pages/PatientCommunications'
import MasterSettings from './pages/MasterSettings'
import Templates from './pages/Templates'
import CaseNote from './pages/CaseNote'
import FeeSchedule from './pages/FeeSchedule'


const App = () => {
  return (
    <div>
      
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Inquiries />} />
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path='prospect' element={<Prospect />}/>
            <Route path='prospect/new' element={<AddProspect />}/>
            <Route path='prospect/:id/edit' element={<EditProspect />}/>
            <Route path='prospect/:id' element={<ProspectDetail />}/>
            <Route path='client' element={<Client />}/>
            <Route path='/groups' element={<Groups />}/>
            <Route path='/groups/new' element={<AddGroup />}/>
            <Route path='/scheduling' element={<Scheduling />}/>
            <Route path='/task' element={<Task />}/>
            <Route path='/toxicology' element={<Toxicology />}/>
            <Route path='/reports' element={<Reports />}/>
            <Route path='/billing' element={<Billing />}/>
            <Route path='/billing/superbill/:id' element={<GenerateSuperbill />}/>
            <Route path='/settings' element={<Settings />}/>
            <Route path='/settings/appointment' element={<AppointmentSettings />}/>
            <Route path='/settings/provider-account' element={<ProviderAccountSettings />}/>
            <Route path='/settings/practice' element={<PracticeSettings />}/>
            <Route path='/settings/patient-communications' element={<PatientCommunications />}/>
            <Route path='/settings/master' element={<MasterSettings />}/>
            <Route path='/settings/templates' element={<Templates />}/>
            <Route path='/settings/templates/case-notes' element={<CaseNote />}/>
            <Route path='/settings/billing/fee-schedule' element={<FeeSchedule />}/>
            <Route path='/client' element={<Client />}/>
          </Route>

        </Routes>
    
    </div>
  )
}

export default App

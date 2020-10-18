import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainSite from '../components/MainSite';
import Sectors from '../components/Sectors';
import SectorPlaces from '../components/SectorPlaces';
import PersonalDataForm from '../components/PersonalDataForm';
import NotFoundPage from '../components/NotFoundPage';
import ConfirmPage from '../components/ConfirmPage';
import FinalPage from '../components/FinalPage';
// import AdminPage from '../components/admin/AdminPage';
// import CreateEvent from '../components/admin/CreateEvent';
// import ReadEvents from '../components/admin/ReadEvents';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={MainSite} exact={true} />
        <Route path="/sectors" component={Sectors} />
        <Route path="/sector-places" component={SectorPlaces} />
        <Route path="/data-form" component={PersonalDataForm} />
        <Route path="/confirm-data" component={ConfirmPage} />
        <Route path="/final" component={FinalPage} />
        {/*<Route path="/admin-panel" component={AdminPage} />*/}
        {/*<Route path="/create-event" component={CreateEvent} />*/}
        {/*<Route path="/read-events" component={ReadEvents} />*/}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;

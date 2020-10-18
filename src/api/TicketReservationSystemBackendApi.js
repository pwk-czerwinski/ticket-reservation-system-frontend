import axios from 'axios';
import { apiPath } from '../index';

/**
 * Class responsible for communication with backend layer of ticket reservation system.
 */
class TicketReservationSystemBackendApi {
    /**
     * Gets all available events.
     *
     * @returns {Promise<* | []>}
     */
    getEvents() {
        return axios.get(apiPath + '/events', { withCredentials: true })
            .then(response => response.status === 200 ? response.data.events : []);
    }

    /**
     * Chooses specific event.
     *
     * @param event
     * @returns {AxiosPromise<any>}
     */
    chooseEvent(event) {
        return axios.post(
            apiPath + '/choose-event',
            {
                'choosedEvent': event
            },
            { withCredentials: true }
        )
    }

    /**
     * Gets sectors for specific event using ID.
     *
     * @param eventId
     * @returns {Promise<[]>}
     */
    getSectors(eventId) {
        return axios.post(
            apiPath + '/sectors',
            {
                'eventId': eventId
            },
            { withCredentials: true }
        ).then((response) => {
            let sectors = [];

            if (response.status === 200) {
                sectors = response.data.sectors;
            }

            return sectors;
        });
    }

    /**
     * Chooses sector by name.
     *
     * @param sectorName
     * @returns {AxiosPromise<any>}
     */
    chooseSector(sectorName) {
        return axios.post(
            apiPath + '/choose-sector',
            {
                'sector': sectorName
            },
            { withCredentials: true }
        )
    }

    /**
     * Adds personal data.
     *
     * @param personalData
     * @returns {AxiosPromise<any>}
     */
    addPersonalData(personalData) {
        return axios.post(
            apiPath + '/add-personal-data',
            { 'personalData': personalData },
            { withCredentials: true }
        );
    }

    /**
     * Gets reservation data like: sector and places.
     *
     * @returns {Promise<* | {places: [], sector: string}>}
     */
    getReservationData() {
        return axios.get(apiPath + '/reservation-data', { withCredentials: true })
            .then(response => response.status === 200 ? response.data : { sector: '', places: [] });
    }

    /**
     * Confirms reservation.
     *
     * @returns {Promise<*>}
     */
    confirmReservation() {
        return axios.get(apiPath + '/confirm-reservation', { withCredentials: true })
            .then(response => response.status === 200 ? response.data : {});
    }

    /**
     * Chooses places.
     *
     * @param places
     * @returns {AxiosPromise<any>}
     */
    choosePlaces(places) {
        return axios.post(
            apiPath + '/choose-places',
            {
                'places': places
            },
            { withCredentials: true }
        );
    }

    /**
     * Gets sector places by sector name and event ID.
     *
     * @param sectorName
     * @param eventId
     * @returns {Promise<*>}
     */
    getSectorPlaces(sectorName, eventId) {
        return axios.post(
            apiPath + '/sector-places',
            {
                'sectorName': sectorName,
                'idEvent': eventId
            },
            { withCredentials: true }
        )
            .then(response => response.data);
    }
}

export default new TicketReservationSystemBackendApi();

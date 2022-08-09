import moment from 'moment-timezone';
import http from './http-common';

const getAll = (bagian) => {
  return http.get(`/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}/${moment().format('YYYY')}-${moment().format('MM')}-${moment().format('DD')}`);
};

const closedTicketLastWeek = bagian => {
  return http.get(`/tiket/closedTicketLastWeek/${bagian}`);
};

const performaKanca = () => {
  return http.get('/tiket/performaKanca');
}

const performaPemasang = () => {
  return http.get('/tiket/performaPemasang');
};

const perJenisMasalah = () => {
  return http.get('/tiket/perJenisMasalah');
};

const perTanggal = () => {
  return http.get('/tiket/perTanggal');
};

const perMinggu = () => {
  return http.get('/tiket/perMinggu');
};

const perBagian = () => {
  return http.get('/tiket/perBagian');
}

const findByTicketID = (ticketID) => {
  return http.get(`/tiket?ticketID=${ticketID}`);
};

const findByPemasang = (pemasang) => {
  return http.get(`/tiket/performaPemasang?pemasang=${pemasang}`);
};

const jenisTiket = () => {
  return http.get('/tiket/jenisTiket')
}

const TiketDataService = {
  getAll,
  closedTicketLastWeek,
  performaPemasang,
  perJenisMasalah,
  perTanggal,
  findByTicketID,
  findByPemasang,
  perMinggu,
  performaKanca,
  perBagian,
  jenisTiket,
};

export default TiketDataService;

import moment from 'moment-timezone';
import http from './http-common';

const getAll = bagian =>
  http.get(`/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-01/${moment().format('YYYY')}-${moment().format('MM')}-31`);

const closedTicketLastWeek = () =>
  http.get(`/tiket/closedTicketLastWeek/`);

const performaKanca = bagian =>
  http.get(`/tiket/performaKanca/${bagian}`);

const performaImplementor = bagian =>
  http.get(`/tiket/performaImplementor/${bagian}`);

const perTanggal = bagian =>
  http.get(`/tiket/perTanggal/${bagian}`);

const perJenisMasalah = bagian =>
  http.get(`/tiket/perJenisMasalah/${bagian}`);

const perMinggu = () =>
  http.get('/tiket/perMinggu');

const perBagian = () =>
  http.get('/tiket/perBagian');

const findByTicketID = (ticketID) =>
  http.get(`/tiket?ticketID=${ticketID}`);

const findByPemasang = (pemasang) =>
  http.get(`/tiket/performaPemasang?pemasang=${pemasang}`);

const jenisTiket = () =>
  http.get('/tiket/jenisTiket')

const TiketDataService = {
  getAll,
  closedTicketLastWeek,
  performaImplementor,
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

import moment from 'moment-timezone';
import http from './http-common';

const getAll = (bagian) =>
  http.get(
    `/tiket/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-01/${moment().format(
      'YYYY'
    )}-${moment().format('MM')}-31`
  );

const closedTicketLastWeek = () => http.get(`/tiket/closedTicketLastWeek/`);

const performaKanca = (bagian) =>
  http.get(
    `/tiket/performaKanca/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-01/${moment().format(
      'YYYY'
    )}-${moment().format('MM')}-31`
  );

const performaImplementor = (bagian) =>
  http.get(
    `/tiket/performaImplementor/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-01/${moment().format(
      'YYYY'
    )}-${moment().format('MM')}-31`
  );

const perTanggal = (bagian) => http.get(`/tiket/perTanggal/${bagian}`);

const perJenisMasalah = (bagian) =>
  http.get(
    `/tiket/perJenisMasalah/${bagian}/${moment().format('YYYY')}-${moment().format('MM')}-01/${moment().format(
      'YYYY'
    )}-${moment().format('MM')}-31`
  );

const perMinggu = () => http.get('/tiket/perMinggu');

const perBagian = () => http.get('/tiket/perBagian');

const findByTicketID = (ticketID) => http.get(`/tiket?ticketID=${ticketID}`);

const findByPemasang = (pemasang) => http.get(`/tiket/performaPemasang?pemasang=${pemasang}`);

const jenisTiket = () => http.get('/tiket/jenisTiket');

const peruntukan = () => http.get('/tiket/peruntukan');

const login = () => http.post('/tiket/login')

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
  peruntukan,
  login,
};

export default TiketDataService;

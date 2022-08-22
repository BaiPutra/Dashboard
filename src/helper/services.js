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

const jenisTiket = () => http.get('/tiket/jenisTiket');

const terlambat = (bagian) => http.get(`/tiket/terlambat/${bagian}`);

const login = () => http.post('/tiket/login')

const TiketDataService = {
  getAll,
  closedTicketLastWeek,
  performaImplementor,
  perJenisMasalah,
  perTanggal,
  perMinggu,
  performaKanca,
  perBagian,
  jenisTiket,
  terlambat,
  login,
};

export default TiketDataService;

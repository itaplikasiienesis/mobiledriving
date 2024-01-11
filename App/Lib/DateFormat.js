import moment from 'moment'

export default (tgl, customformat = 'DD-MM-YYYY', initialformat = null) => {
  if (!tgl) return ''
  if (initialformat) {
    return moment(tgl, initialformat).format(customformat)    
  }
  return moment(tgl).format(customformat)
}
  
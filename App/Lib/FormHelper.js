import _ from 'lodash'

/**
 * Mochamad Fachmi Rizal @ CV.Teknologi Nusantara
 */

export default (INSTANCE) => {
  
  const FormHelper = {
    createFormState: function (payload, state) {
      //inialisasi bila state form masih kosong
      if (!state.form) {
        return { ...state, form: payload, oldForm: payload }
      }

      //bila payload baru berbeda dengan yg lama, maka update oldForm, itu artinya payload telah berubah (bisa karena terupdate dari hasil req API)
      if (!_.isEqual(payload,state.oldForm)) {
        return { ...state, form: payload, oldForm: payload, isedit: false }
      }

      //bila state form berbeda dengan default form sebelum berubah, maka ada indikasi beberapa field pada form sedang di rubah (*catatan: payload dari server masih lama)
      if (_.isEqual(state.form, state.oldForm)) {
        return { ...state, isedit: false}
      } else {
        return { ...state, isedit: true}
      }
    },
    setFormValue: async function (obj, cb) {
      try {
        await INSTANCE.setState({
          // form: Object.assign( this.state.form, obj )      
          form: {
            ...INSTANCE.state.form,
            ...obj
          }
        }, cb )
      } catch (error) {
        return null
      }
      return INSTANCE.state.form
    },
    isChanged: function (key) {
      try {
        return (INSTANCE.state.form[key] !== INSTANCE.state.oldForm[key])
      } catch (error) {
        return false
      }
    },
    getValue: function () {
      return INSTANCE.state.form
    },
    revertValue: function () {
      return this.setFormValue(INSTANCE.state.oldForm)
    },
    isEditState: function () {
      return INSTANCE.state.isedit
    }
  }
  return FormHelper
}

// export default FormHelper
  

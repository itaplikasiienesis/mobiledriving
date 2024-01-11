import AsyncStorage from '@react-native-async-storage/async-storage' 
 
export default (STORAGE_NAME) => {
  
  const AsyncStorageHelper = {
    setData: async function (data) {
      try {
        let dataToSave
        if ((typeof data === 'object')) {
          dataToSave = JSON.stringify(data)
        } else if (Array.isArray(data)) {
          dataToSave = JSON.stringify(data)
        } else {
          dataToSave = data
        }
        await AsyncStorage.setItem(STORAGE_NAME, dataToSave)
        return data
      } catch (error) {
        console.log('setdata err', error)        
        return data
      }

    },
    getData: async function () {
      try {
        const value = await AsyncStorage.getItem(STORAGE_NAME)
        if (value !== null) {
          // We have data!!
          return value
        }
      } catch (error) {
        return null
      }
      return null
    },
    getDataArray: async function () {
      try {
        const value = await AsyncStorage.getItem(STORAGE_NAME)
        if (value !== null) {
          // We have data!!
          return JSON.parse(value)
        }
      } catch (error) {
        return []
      }
      return []
    },
    getDataObject: async function () {
      try {
        const value = await AsyncStorage.getItem(STORAGE_NAME)
        if (value !== null) {
          // We have data!!
          return JSON.parse(value)
        }
      } catch (error) {
        return null
      }
      return null
    },
    addData: async function (record) {
      try {
        let currentData = await AsyncStorageHelper.getData() || []
        currentData.push(record)
  
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(currentData))
        return currentData
      } catch (error) {
        console.log('err', error)        
        return []
      }
    },
    clearData: async function(){
      await AsyncStorage.removeItem(STORAGE_NAME)
    },
    deleteData: async function(id){
      try {
        let currentData = await AsyncStorageHelper.getData() || []
        
        const newArr = currentData.filter((x) => x.id != id)
    
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(newArr))
        return newArr
      } catch (error) {
        console.log('err', error)        
        return []
      }
    },
    editData: async function(record){
      try {
        let currentData = await AsyncStorageHelper.getData() || []
        
        currentData.forEach((element, index) => {
          if(element.id === record.id) {
            currentData[index] = record
          }
        })
    
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(currentData))
        return currentData
      } catch (error) {
        console.log('err', error)        
        return []
      }
    },
  }
  return AsyncStorageHelper
}

// export default AsyncStorageHelper
  

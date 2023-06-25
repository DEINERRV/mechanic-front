import {store,persistor} from './store'
import {login,logout} from './authSlice'

import {    
    create as serviceCreate,
    elim as serviceDelete,
    getAll as serviceGetAll,
    getById as serviceGetById,
    update as serviceUpdate,
} from './servicesSlice'

import {    
    create as vehicleCreate,
    elim as vehicleDelete,
    getById as vehicleGetById,
    update as vehicleUpdate,
    getAll as vehicleGetAll
} from './vehiclesSlice'

import {    
    create as repairCreate,
    elim as repairDelete,
    getById as repairGetById,
    update as repairUpdate,
    getAll as repiartGetAll
} from './repairsSlice'

import {
    create as userCreate,
    getAll as userGetAll,
    getById as userGetById,
    update as userUpdate,
} from './usersSlice'

export{
    store,
    persistor,
    //Auth
    login,
    logout,
    //Service
    serviceCreate,
    serviceDelete,
    serviceGetAll,
    serviceGetById,
    serviceUpdate,
    //Vehice
    vehicleCreate,
    vehicleDelete,
    vehicleGetById,
    vehicleUpdate,
    vehicleGetAll,
    //Repair
    repairCreate,
    repairDelete,
    repairGetById,
    repairUpdate,
    repiartGetAll,
    //User
    userCreate,
    userGetAll,
    userGetById,
    userUpdate,
}
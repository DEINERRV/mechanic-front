import {
    auth,
    register
} from './auth.js'

import {
    create as serviceCreate,
    eliminate as serviceDelete,
    getAll as serviceGetAll,
    getById as serviceGetById,
    update as serviceUpdate
} from './service.js'

import {
    create as vehicleCreate,
    eliminate as vehicleDelete,
    getById as vehicleGetById,
    update as vehicleUpdate,
    getAll as vehicleGetAll,
} from './vehicle.js'

import {
    create as repairCreate,
    eliminate as repairDelete,
    getById as repairGetById,
    update as repairUpdate,
    getAll as repiarGetAll,
} from './repair.js'

import {
    getById as userGetById,
    getAll as userGetAll,
    update as userUpdate,
} from './user.js'


export{
    auth,
    register,
    //Service
    serviceCreate,
    serviceDelete,
    serviceGetAll,
    serviceGetById,
    serviceUpdate,
    //Vehicle
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
    repiarGetAll,
    //User
    userGetById,
    userGetAll,
    userUpdate,
}
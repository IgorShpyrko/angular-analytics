export default {
  serverUrl: 'http://localhost:8000',
  admin: {
    login: '/admin/login',
    getCustomer: '/admin/customer',
    getCustomers: '/admin/customers',
    getCustomerSites: '/admin/customer/sites',
    deleteCustomer: '/admin/customer',
    clearDb: '/admin/clear'
  },
  customer: {
    register: '/customer/register',
    login: '/customer/login',
    update: '/customer/',
    delete: '/customer/'
  },
  sites: {
    add: '/sites/add',
    get: '/sites',
    getAll: '/sites',
    update: '/sites',
    delete: '/sites',
    deleteAll: '/sites/all',
  },
  actions: {
    create: '/actions',
    getAvailable: '/actions/list',
    get: '/actions/',
    update: '/actions/',
    delete: '/',
    deleteAll: '/',
  },
  events: {
    create: '/events/',
    get: '/events/',
    update: '/events/',
    deleteAll: '/events/all'
  },
  token: {
    getRefreshToken: '/customer/refreshToken'
  }
}

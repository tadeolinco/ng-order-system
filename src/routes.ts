import { Router } from 'express';
import * as CustomerCtrl from './controllers/customer.controller';
import * as MenuCtrl from './controllers/menu.controller';

const router = Router();

router.get('/customers', CustomerCtrl.getCustomers);
router.get('/customers/:id', CustomerCtrl.getCustomer);
router.post('/customers', CustomerCtrl.createCustomer);
router.put('/customers/:id', CustomerCtrl.updateCustomer);
router.delete('/customers/:id', CustomerCtrl.deleteCustomer);

router.get('/menus', MenuCtrl.getMenus);
router.get('/menus/:id', MenuCtrl.getMenu);
router.post('/menus', MenuCtrl.createMenu);
router.put('/menus/:id', MenuCtrl.updateMenu);
router.delete('/menus/:id', MenuCtrl.deleteMenu);

export default router;
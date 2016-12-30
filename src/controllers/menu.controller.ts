import Menu from '../models/menu.model';
import { Response, Request } from 'express';

export const getMenus = (req: Request, res: Response) => {
    Menu.find({}, (err, menus) => {
        if (err) throw err;
        return res.json(menus);
    });
}

export const getMenu = (req: Request, res: Response) => {
    Menu.findById(req.params.id, (err, menu) => {
        if (err) throw err;
        return res.json(menu);
    });
}

export const createMenu = (req: Request, res: Response) => {
    var newMenu = new Menu({
        food: req.body.food,
        price: req.body.price,
        isAvailable: true
    });

    newMenu.save((err, menu) => {
        if (err) throw err;
        return res.json(menu);
    });
}

export const updateMenu = (req: Request, res: Response) => {
    Menu.findById(req.params.id, (err, menu) => {
        if (err) throw err;

        menu.food = req.body.food || menu.food;
        if (typeof req.body.price === 'number') 
            menu.price = req.body.price
        if (typeof req.body.isAvailable === 'boolean') 
            menu.isAvailable = req.body.isAvailable

        menu.save((err, newMenu) => {
            if (err) throw err;
            return res.json(newMenu);
        });
    });
}

export const deleteMenu = (req: Request, res: Response) => {
    Menu.findByIdAndRemove(req.params.id, (err, menu) => {
        if (err) throw err;
        return res.json(null);
    });
}


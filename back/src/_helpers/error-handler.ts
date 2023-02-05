import type { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ responseBody: null, error: err });
    }

    // default to 500 server error
    return res.status(500).json({ responseBody: null, error: err.message });
}

export default errorHandler
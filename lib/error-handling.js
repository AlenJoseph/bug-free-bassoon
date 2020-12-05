/**
 * @fileoverview functions for error handling 
 *
 * @author Alen Joseph
 */

//  custom error for server error
 exports.serverError=(err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send({ msg: 'Something is broke!' });
  }
 

  exports.routeNotFound =(req, res) => {
    res.status(404).json({ msg: 'The route you requested has not been found' });
  }


 
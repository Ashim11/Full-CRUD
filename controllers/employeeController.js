const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("employee/addOrEdit",{
        viewTitle : "Insert Employee"
    });
});

router.post('/ ',(req,res)=>{
    console.log(req.body);
    });

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id: req.body._id}, req.body,
        {new: true}, (err, doc) => {
            if (!err){ res.redirect('employee/list');}
            else{
                if(err.name == 'ValidationError'){
                    handleValidationError(err, req.body);
                    res.render("employee/addOrEdit",{
                        viewTitle : 'Update Employee',
                        employee : req.body
                    });
                }
                else
                    console.log('Error during record update :' + err);

            }
        });
}


function insertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) =>{
        if (!err)
            res.redirect('employee/list');
        else{
            console.log('Error during record insertion : + err');
        }
    });
}

router.get('/list',(req,res)=>{
    res.json('from list');
});

//route for delete 
router.get('/delete/:id', (req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' +err);}
    });
});

router.get('/:id', (req,res)=>{
    Employee.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render('/employee/addOrEdit',{
                viewTitle: "Update Employee",
                employee: "",
            });
        }
        else { console.log('Error in employee delete :' +err);}
    });
});

mpdule.exports = router;

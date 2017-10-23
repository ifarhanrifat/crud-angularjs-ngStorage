app.controller("myCtrl", function($scope, $localStorage) {

  var vm = this;
  vm.data = {};
  vm.$storage = $localStorage;

  vm.showInputs = false;
  vm.togInputRow = togInputRow;

  function togInputRow() {
    vm.showInputs = !vm.showInputs;
  }

  vm.clearAll = function() {
    vm.data.fname = null;
    vm.data.lname = null;
    vm.data.age = null;
    vm.data.classs = null;
    vm.data.fees = null;

  };

  vm.submit = submit;
  vm.arr = vm.$storage.arr || [];

  function submit() {
    var obj = {
      fname: vm.data.fname,
      lname: vm.data.lname,
      age: vm.data.age,
      classs: vm.data.classs,
      fees: vm.data.fees
    };

    vm.arr.push(obj);
    vm.$storage.arr = vm.arr;
    console.log(obj);

  }
  
   vm.removeRow = function(index) {
    vm.newAfterRemove = [];
    vm.arr.splice(index, 1);
    angular.forEach(vm.arr, function(index) {
      if (!index.removeRow) {
        vm.newAfterRemove.push(index);
        vm.$storage.newAfterRemove = vm.newAfterRemove;
      }
    });
    vm.$storage.arr = vm.$storage.newAfterRemove;
    vm.$storage.arr = vm.arr;
    console.log(vm.arr);

  };

    vm.submitBtn = false;
    vm.saveBtn = false;

  vm.edit = function(id) {
    vm.showInputs = true;
    vm.submitBtn = true;
    vm.saveBtn = true;

    for (i = 0; i < vm.arr.length; i++) {

      if (vm.arr[i].id == id) {
        vm.data.myid = id;
        vm.data.fname = vm.arr[i].fname;
        vm.data.lname = vm.arr[i].lname;
        vm.data.classs = vm.arr[i].classs;
        vm.data.age = vm.arr[i].age;
        vm.data.fees = vm.arr[i].fees;
      }
    }
  };

  vm.savedata = function() {
    vm.newAfterEdit = [];
    for (i = 0; i < vm.arr.length; i++) {
      if (vm.arr[i].id == vm.data.myid) {
        vm.arr[i] = ({
          'fname': vm.data.fname,
          'lname': vm.data.lname,
          'classs': vm.data.classs,
          'age': vm.data.age,
          'fees': vm.data.fees
        });
        vm.showInputs = true;
        vm.submitBtn = false;
        vm.saveBtn = false;
      }
    }

    angular.forEach(vm.arr, function(index) {
      if (!index.savedata) {
        vm.newAfterEdit.push(index);
        vm.$storage.newAfterEdit = vm.newAfterEdit;
      }
    });

    vm.$storage.arr = vm.$storage.newAfterRemove;
    vm.$storage.arr = vm.arr;
    console.log(vm.arr);
  };

});
(function() {
  'use strict';

  angular
    .module('petClient')
    .controller('PetSearchController', PetSearchController);

  /** @ngInject */
  function PetSearchController($log, $http, $modal, petSearchService) {
    var vm = this;
    vm.search = search;
    vm.deletePet = deletePet;
    vm.pet = undefined;
    vm.deletePetSuccessful = false;

    $log.info('Initializing pet search controller!');

    function search(petId) {
      petSearchService.search(petId)
        .then(function (pet) {
          $log.info('Retrieved pet: ', pet);
          vm.pet = pet;
        });
    }

    function deletePet(petId) {
      $log.info("Deleting pet id: ", petId);
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/search/pet-delete-modal.html',
        controller: 'PetDeleteController',
        controllerAs: 'petDelete',
        size: 'lg',
        resolve: {
          pet: function () {
            return vm.pet;
          }
        }
      });

      modalInstance.result.then(function (deleted) {
        vm.deletePetSuccessful = deleted;
        if (deleted) {
          vm.pet = undefined;
        }
      }, function () {
        vm.deletePetSuccessful = false;
      });
    }

  }
})();

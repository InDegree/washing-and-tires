function init(element){
  var _self = this,
      toaster = document.getElementById('mdl-toaster');

  _self.toasterShow = function() {
    toaster.classList.add('-show');
  };

  _self.toasterHide = function() {
    toaster.classList.remove('-show');
  };

  toaster.querySelector('.mdl-close-toaster').onclick = function(e) {
    _self.toasterHide();
  };

  _self.filter = function(e) {

    var filterParent = e.closest('.mdl-filters'),
        filterValues = filterParent.querySelectorAll('.mdl-filters__value'),
        informBoxes = document.querySelectorAll('.mdl-card'),
        errorBox = document.getElementById('mdl-error__search'),
        errorArray = [];

    for(var j = 0; j < informBoxes.length; j++){
      var cardInfo = informBoxes[j].querySelectorAll('.demo__information-item'),
          selectedFlag = true;

      for(var i = 0; i < filterValues.length; i++){
        var filterValue = filterValues[i].getAttribute('data-value'),
            numberFlag = isNaN(parseFloat(filterValue));

        if(filterValue !== '-1' && filterValue !== cardInfo[i].textContent && numberFlag){
          selectedFlag = false;
        }

        if(filterValue !== '-1' && !numberFlag){
          var from = Number(filterValue.split('-')[0]),
              to = Number(filterValue.split('-')[1]),
              numberSelectedValue = Number(cardInfo[i].textContent),
              numberEquality = null;

          if(isNaN(to)){
            numberEquality = filterValue === cardInfo[i].textContent;
          }else{
            numberEquality = from < numberSelectedValue && numberSelectedValue < to;
          }

          if(!numberEquality){
            selectedFlag = false;
          }

        }

      }

      cardInfo[0].closest('.mdl-cell').classList.remove('-hidden');
      if(!selectedFlag){
        cardInfo[0].closest('.mdl-cell').classList.add('-hidden');
        errorArray.push(selectedFlag)
      }
    }

    if(errorArray.length === informBoxes.length){
      errorBox.style.display = 'block';
    }else{
      errorBox.style.display = 'none';
    }

  };

  _self.select = function(e){
    var __self = this,
        dropShow = e.getAttribute('data-opened'),
        selectItems = e.querySelectorAll('.mdl-filters__drop-item');

    function setValue(event) {

      var el = event.target,
          valueBox = e.querySelector('.mdl-filters__value'),
          dataValue = el.getAttribute('data-value');

      valueBox.textContent = el.textContent;
      valueBox.setAttribute('data-value', dataValue);

      for(var i = 0; i < selectItems.length; i++){
        selectItems[i].removeEventListener('click', setValue, false);
      }

    }

    for(var g = 0; g < selectItems.length; g++){
      selectItems[g].addEventListener('click', setValue, false);
    }

    __self.show = function () {
      var allSelects = document.querySelectorAll('.mdl-filters__select');
      for(var s = 0; s < allSelects.length; s++){
        allSelects[s].classList.remove('-visible')
      }
      e.classList.add('-visible');
      e.setAttribute('data-opened', 'true');
    };

    __self.hide = function () {
      e.classList.remove('-visible');
      e.setAttribute('data-opened', 'false');
    };

    if(dropShow === 'false' || !dropShow){
      __self.show();
    }else{
      _self.filter(e);
      _self.toasterShow();
      __self.hide();
    }

  };

  _self.select(element)

}

function more(className) {
  var parent = document.querySelector(className),
      card = parent.querySelector('.mdl-cell'),
      overflowBox = parent.closest('.mdl-overflow'),
      overflowHeight = (card.offsetHeight + 21) * 2,
      button = document.getElementById('mdl-button__more');

  if(overflowBox.offsetHeight > overflowHeight){
    overflowBox.style.height = overflowHeight + 'px';
    button.style.display = 'block';
  }

  button.onclick = function (e) {
    var addHeight = overflowBox.offsetHeight + overflowHeight,
        loading = document.getElementById('mdl-loading')
    loading.classList.add('-processing');

    if(addHeight < parent.offsetHeight){
      overflowBox.style.height = addHeight + 'px';
    }else{
      overflowBox.style.height = parent.offsetHeight + 'px';
      button.style.display = 'none'
    }

    setInterval(function(){
      loading.classList.remove('-processing');
    }, 1000)
  }
}

function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete-card"><span class="fa fa-trash-o trash" aria-hidden="true"></span></button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function () {
			alertify.confirm('Delete card', 'Crush the "' + self.name + '" card?', function () {
				self.removeCard();
				alertify.message('Card "' + self.name + '" is crushed');
			}, function () {
				alertify.error('You almost delete it!');
			}).set('labels', {
				ok: 'Do you want to crush it?',
				cancel: 'Keep it. For now :)'
			});
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}

Card.prototype = {
	removeCard: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function () {
				self.element.remove();
			}
		});
	}
}
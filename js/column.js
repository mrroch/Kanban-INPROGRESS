function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="column-card-list"></ul>');
		var columnDelete = $('<button class="btn-delete"><span class="fa fa-trash-o" aria-hidden="true"></span></button>');
		var columnAddCard = $('<button class="column-add-card"><span class="fa fa-plus plus" aria-hidden="true"></span></button>');


		columnDelete.click(function () {
			alertify.confirm('Delete column', 'Hang out "' + self.name + '" column?', function () {
				self.deleteColumn();
				alertify.message('Column "' + name + '" deleted')
			}, function () {
				alertify.error('Uff... it was close!')
			}).set('labels', {
				ok: 'Hang up!',
				cancel: 'Nope!'
			});
		});

		columnAddCard.click(function (event) {
			alertify.prompt('Card name', 'Enter card name', 'Plese enter name here :)', function (evt, value) {
				cardName = value;
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
						name: cardName,
						bootcamp_kanban_column_id: self.id
					},
					success: function (response) {
						var card = new Card(response.id, cardName);
						self.createCard(card);
					}
				});

				alertify.success('Card "' + value + '" created');
			}, function () {
				alertify.error('Cancelled');
			}).set('labels', {
				ok: 'Done!',
				cancel: 'I changed my mind'
			});
			event.preventDefault();
		});

		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
		return column;
	}
}

Column.prototype = {
	createCard: function (card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response) {
				self.element.remove();
			}
		});
	}
};
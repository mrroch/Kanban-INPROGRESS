var board = {
	name: 'Tablica Kanban',
	createColumn: function (column) {
		this.element.append(column.element);
		initSortableCards();
        initSortableColumns();
	},
	element: $('#board .column-container')
};

function initSortableCards() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder',
        receive: function(event, ui){
            itemId = ui.item[0].id;
            itemName = ui.item[0].innerText;
            targetColumnId = ui.item[0].parentElement.id;
            moveItem(itemId, itemName, targetColumnId);
        }
    }).disableSelection();
}

function initSortableColumns() {
    $('.column-container').sortable({
        connectWith: '.column-container',
        placeholder: 'column-placeholder',
        beforeStop: function(event, ui){
            // console.log(ui);
        }
    }).disableSelection();
}

$('.create-column')
	.click(function () {
		board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
	});


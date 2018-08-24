-function($){

axios.defaults.baseURL = 'https://maze0.hunnur.com:20752';
axios.interceptors.response.use(null, error => alert(error));

var name, form;
const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];

const displayVote = (vote) => {
    const row = $('<tr></tr>');
    sizes.forEach(size => {
        const value = vote[size] || 'none';
        row.append(`<td>${ value }</td>`);
    });
    const table = $(`
        <table id="single-vote">
            <caption>My vote</caption>
            <tr>
                <th>Tiny</th>
                <th>Small</th>
                <th>Medium</th>
                <th>Large</th>
                <th>Huge</th>
            </tr>
        </table>`);
    table.append(row);

    $('#single-vote').remove();
    form.after(table);
};

const displayVotes = votes => {
    const rows = votes.map(row => $(`
        <tr>
            <td>${ row.size }</td>
            <td>${ row.value }</td>
            <td>${ row.voters.join(', ') }</td>
        </tr>
    `));
    const table = $(`
        <table id="all-votes">
            <caption>All votes</caption>
            <tr>
                <th>Size</th>
                <th>Value</th>
                <th>Voters</th>
            </tr>
        </table>`);
    table.append(rows);

    $('#all-votes').remove();
    form.after(table);
};

const getName = () => {
    const voter = name.val().trim();

    if (voter === '') {
        alert('We need your name in order for you to vote');
        throw Error('Missing name');
    }

    return voter;
};

$(function() {
    const inputs = sizes.reduce((acc, size) => {
        const className = size + '-spacing';
        acc[size] = $(`[name="${ className }"]`);
        return acc;
    }, {});
    name = $('[name="voter-name"]');

    sizes.forEach(size => {
        const className = size + '-spacing';
        var wrappers = $(`.${ className }`);
        const items = wrappers.find('> *, td, th')
            .add(`.${ className }-item`);
        wrappers = wrappers.filter(':not(table)');

        inputs[size].change(function() {
            const spacing = $(this).val().trim();
            if (spacing === '') {
                return;
            }

            const val = spacing.replace(/[\d\.]+/, n => parseFloat(n) / 2);
            wrappers.css({margin: `-${ val }`});
            items.css({padding: val});
        });
    });

    form = $('form[name="vote"]');
    form.submit(function() {
        try {
            const voter = getName();
        }
        catch (e) {
            return false;
        }
        const endpoint = `/votes/${ name.val().trim() }`;

        const vote = Object.keys(inputs).reduce((acc, size) => {
            const input = inputs[size];
            const value = input.val().trim()
            if (value !== '') {
                acc[size] = value;
            }
            return acc;
        }, {});

        const method = $('[name="request-method"]:checked').val();
        axios[method](endpoint, vote)
             .then(resp => displayVote(typeof(resp.data) === 'object'
                    ? resp.data : vote));

        return false;
    });

    $('[name="get-vote"]').click(function() {
        const voter = getName();
        const endpoint = `/votes/${ voter }`;

        axios.get(endpoint)
             .then(resp => {
                 const vote = resp.data;

                 displayVote(vote);
                 sizes.forEach(size => {
                     const value = vote[size];
                     if (value) {
                         const input = inputs[size];
                         input.val(value);
                         input.change();
                     }
                 });
             });
    });

    $('[name="get-all"]').click(function() {
        axios.get('/votes')
             .then(resp => displayVotes(resp.data));
    });
});

}(jQuery);

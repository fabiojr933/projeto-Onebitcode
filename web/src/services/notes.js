import Api from './api';

const NotesService = {
    index: () => Api.get('/note', {
        headers: {'x-access-token': localStorage.getItem('token')}
    }),
    create: () => Api.post('/note', { 'title': 'Nova nota', 'body': 'Nova nota...' }, {
        headers: {'x-access-token': localStorage.getItem('token')}
    }),
    delete: (id) => Api.delete(`/note/${id}`,  {
        headers: {'x-access-token': localStorage.getItem('token')}
    }),
    update: (id, params) => Api.put(`/note/${id}`, params, {
        headers: {'x-access-token': localStorage.getItem('token')}
    }),
    seach: (query) => Api.get(`/note/search?query=${query}`, {
        headers: {'x-access-token': localStorage.getItem('token')}
    }),
}
export default NotesService;
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function Single({ auth, feedback, csrf }) {
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        feedback_id: feedback.id,
        text: ''
    });
    useEffect(() => {
        setComments(feedback.comments);
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/feedback/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            const data = await response.json();
            // Update comments state with the new comments data
            setComments(data.comments);
            // Reset form data after submission
            setFormData({
                ...formData,
                text: ''
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight mb-4">Feedback</h2>}
        >
            <Head title="Feedback" />
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-4">{feedback.title}</h5>
                                <p className="card-text">{feedback.description}</p>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    <span className="badge bg-primary">{feedback.category}</span>
                                </h6>
                                <p className="card-text">Submitted by: {feedback.user.name}</p>
                                <p className="card-text">Submitted on {new Date(feedback.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>


                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-4">Comments</h5>
                                {comments.map(comment => (
                                    <div className="card mb-2" key={comment.id}>
                                        <div className="card-body">
                                            <h5 className="card-title">{comment.user.name}</h5>
                                            <p className="card-text">{comment.text}</p>
                                            <p className="card-text text-muted">{moment(comment.created_at).fromNow()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add a form for submitting new comments */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">Add Comment</label>
                                <textarea className="form-control" id="comment" name='text' rows="3" value={formData.text} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
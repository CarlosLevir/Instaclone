import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../services/api';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import likeActive from '../assets/like-active.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.socketRegister();
    const response = await api.get('/posts');
    this.setState({ feed: response.data });
  }

  handleLike = (id) => {
    api.post(`/posts/${id}/like`);
  };

  socketRegister = () => {
    const socket = io('http://localhost:3333');

    const { feed } = this.state;

    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...feed] });
    });

    socket.on('like', (likedPost) => {
      this.setState({
        feed: feed.map(post => (post._id === likedPost._id ? likedPost : post)),
      });
    });
  };

  render() {
    const { feed } = this.state;
    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} alt="Mais" />
            </header>

            <img src={`http://localhost:3333/files/${post.image}`} alt="" />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={post.likes ? likeActive : like} alt="" />
                </button>
                <img src={comment} alt="" />
                <img src={send} alt="" />
              </div>

              <strong>
                {post.likes}
                {' '}
curtidas
              </strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;

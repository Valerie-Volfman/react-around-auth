import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this._baseUrl = props.baseUrl;
    this._headers = props.headers;
  }

  async getUserData() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async editUserData({ name, about }) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });

    return this._getResponseData(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async addCard({ name, link }) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });

    return this._getResponseData(response);
  }

  async addLikes(userData) {
    const response = await fetch(
      `${this._baseUrl}/cards/likes/${userData._id}`,
      {
        method: "PUT",
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  async removeLikes(userData) {
    const response = await fetch(
      `${this._baseUrl}/cards/likes/${userData._id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    );

    return this._getResponseData(response);
  }

  async changeLikeCardStatus(userData, isLiked) {
    return !isLiked ? this.addLikes(userData) : this.removeLikes(userData);
  }

  async removeCard(card) {
    const response = await fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    });

    return this._getResponseData(response);
  }

  async editProfilePic({ avatar }) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    });

    return this._getResponseData(response);
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(
        "Something went wrong",
        response.status,
        response.statusText
      );
    }
    return response.json();
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "2911a1a5-67c1-4d46-aa09-949272fd93e2",
    "Content-Type": "application/json",
  },
});

export default api;

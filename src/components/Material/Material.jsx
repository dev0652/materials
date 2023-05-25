import { Component } from 'react';

const EditMaterialModal = ({ onClose, onEdit }) => {
  return (
    <div>
      <h2>Модалка редактирования материала</h2>
      <button
        type="button"
        onClick={() => {
          onEdit();
          onClose();
        }}
      >
        Вот теперь точно редактировать
      </button>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export class Material extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { item, onUpdate, onDelete } = this.props;
    const { isModalOpen } = this.state;
    const { id, title, link } = item;

    return (
      <div>
        <p>
          <b>Title:</b> {title}
        </p>
        <p>
          <b>Link:</b> {link}
        </p>
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
        <button type="button" onClick={this.openModal}>
          Edit
        </button>
        {isModalOpen && (
          <EditMaterialModal
            onClose={this.closeModal}
            onEdit={() => onUpdate({ id, title: Date.now() })}
          />
        )}
      </div>
    );
  }
}

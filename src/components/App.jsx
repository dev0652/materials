import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';

import { Layout } from './Layout';
import { MaterialEditorForm } from './MaterialEditorForm/MaterialEditorForm';
import { MaterialList } from './MaterialList/MaterialList';

import * as API from 'services/api';

// #########################################

export class App extends Component {
  state = {
    materials: [],
    isLoading: false,
    error: false,
  };

  // ###### Lifecycle

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const materials = await API.getMaterials();
      this.setState({ materials });
    } catch (error) {
      this.setState({ error: true });
      console.log('error: ', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // ###### Methods

  addMaterial = async values => {
    try {
      // this.setState({ isLoading: true });
      const material = await API.addMaterial(values);

      this.setState(prevState => ({
        materials: [...prevState.materials, material],
        // isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log('error: ', error);
    }
  };

  deleteMaterial = async id => {
    try {
      await API.deleteMaterial(id);

      this.setState(prevState => ({
        materials: prevState.materials.filter(material => material.id !== id),
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log('error: ', error);
    }
  };

  updateMaterial = async fields => {
    try {
      const updatedMaterial = await API.updateMaterial(fields);

      this.setState(prevState => ({
        materials: prevState.materials.map(material =>
          material.id === fields.id ? updatedMaterial : material
        ),
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log('error: ', error);
    }
  };
  // ###### Rendering

  render() {
    const { materials, isLoading, error } = this.state;
    const { addMaterial, deleteMaterial, updateMaterial } = this;

    return (
      <Layout>
        <GlobalStyle />
        {error && <p>Oops, something went wrong</p>}

        <MaterialEditorForm onSubmit={addMaterial} />

        {isLoading ? (
          'Loading...'
        ) : (
          <MaterialList
            items={materials}
            onDelete={deleteMaterial}
            onUpdate={updateMaterial}
          />
        )}
      </Layout>
    );
  }
}

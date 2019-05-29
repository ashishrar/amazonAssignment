import React, { Component } from 'react';
import logo from './icon.png';
import './App.css';
import ClickOutside from 'react-simple-click-outside';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItemList: false,
      searchVal: '',
      items: [
        {
          name: 'Marina Augustine',
          email: 'marina@example.com',
          isShown: true
        },
        {
          name: 'Nick Augustine',
          email: 'nick@example.com',
          isShown: true
        },
        {
          name: 'Anita Augustine',
          email: 'anita@example.com',
          isShown: true
        },
        {
          name: 'Megan Augustine',
          email: 'megan@example.com',
          isShown: true
        }
      ],
      selectedItems: [],
      heighlightLast: false
    }
  }

  toggleItems(showItemList) {
    setTimeout(() => {
      this.setState({showItemList, heighlightLast: false});
    }, 100);
  } 

  selectItems(index) {
    let items = this.state.items;
    let selectedItems = this.state.selectedItems;
    selectedItems.push(items[index]);
    items[index].isShown = false;

    this.setState({selectedItems, items});
  }

  removeItem(index){
    let selectedItems = this.state.selectedItems;
    let itemToRemove = selectedItems[index];
    selectedItems.splice(index, 1);

    let items = this.state.items;
    items.forEach(function(item, itemIndex) {
      if(item.email === itemToRemove.email) {
        items[itemIndex].isShown = true;
      }
    })

    this.setState({items, selectedItems});
  }

  handleSearchValue(e) {
    this.setState({searchVal: e.target.value});
    if(this.state.heighlightLast) {
      this.setState({heighlightLast: false});
    }
  }

  handleBackButton(e) {
    if(!e.target.value && e.keyCode === 8){
      if(!this.state.heighlightLast) {
        this.setState({heighlightLast: true});
      } else{
        this.removeItem(this.state.selectedItems.length - 1);
        this.setState({heighlightLast: false});
      }
    }
  }

  render() {
    return (
      <ClickOutside className="App" close={() => this.toggleItems(false)}>
        <div className="selected-item-container">
          {
            this.state.selectedItems.map((item, index) => (
              <div className="selected-items" style={{backgroundColor: index+1 == this.state.selectedItems.length && this.state.heighlightLast ? '#b58484' : '#e1e1e1'}}>
                <img src={logo} className="icon" />
                <span>{item.name}</span>
                <span className="remove-icon" onClick={() => this.removeItem(index)}>X</span>
              </div>
            ))
          }
          <div className="input-container">
            <input type="text" placeholder="search" value={this.state.searchVal} onChange={(e) => this.handleSearchValue(e)} onFocus={() => this.toggleItems(true)}  onKeyDown={(e) => this.handleBackButton(e)}/>
            <table className="item-list-container" cellSpacing="0" style={{visibility: this.state.showItemList ? '' : 'hidden'}}>
              <tbody>
                {
                  this.state.items.filter(item => item.name.toLowerCase().indexOf(this.state.searchVal) !== -1)
                  .map((item, index) => {
                    return (  
                      item.isShown && <tr className="item-list" onClick={() => this.selectItems(index)}>
                        <td className="list-icon"><img src={logo} className="icon" /></td>
                        <td className="name">{item.name}</td>
                        <td className="email">{item.email}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </ClickOutside>
    );
  }
}

export default App;
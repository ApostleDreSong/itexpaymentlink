import React, { useEffect, useState } from 'react';
import Dropdown from '../../images/dropdown.png'

const LinkInput = ({ label, hasDropdown, selectOptions, editable = true, initialValue, updateValue, name, value }) => {
    const [options, setOptions] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    // const [value, setValue] = useState(initialValue ?? '')

    useEffect(() => {
        if (selectOptions) {
            setOptions(selectOptions)
            setSelectedOption(selectOptions[0])
        }
    }, [selectOptions])

    // useEffect(() => {
    //     if (initialValue) {
    //         updateValue(name, initialValue)
    //     }
    // }, [initialValue])

    return <div>
        <div style={{
            marginBottom: '16px'
        }}>{label}</div>
        {!hasDropdown && <input style={{
            width: '100%',
            height: '54px',
            border: '1px solid #C8C8CE',
            borderRadius: '4px'
        }}
            value={value}
            disabled={!editable}
            onChange={(e) => {
                // setValue(e.target.value)
                updateValue(name, e.target.value)
            }}
        />}
        {hasDropdown && <div style={{
            display: 'flex'
        }}>
            <div
                onClick={
                    () => {
                        setShowDropdown(prev => !prev)
                    }
                }
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '104px',
                    padding: '16px',
                    position: 'relative',
                    border: '1px solid #C8C8CE',
                    borderRight: 'none',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0
                }}
            >
                {showDropdown && <div
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        zIndex: 50,
                        backgroundColor: 'white',
                        width: '104px',
                        height: '100px',
                        cursor: 'pointer',
                        overflowY: 'auto'
                    }}
                >
                    {
                        options.map((option, index) => {
                            return <div key={index} onClick={
                                (e) => {
                                    e.stopPropagation()
                                    setSelectedOption(option)
                                    setShowDropdown(false)
                                }
                            }
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '5px',
                                    padding: '10px'
                                }}
                                id='options'
                            >{option?.name}</div>
                        })
                    }
                </div>}
                {selectedOption?.name ?? ''}
                <img src={Dropdown} alt="dropdown-icon" />
            </div>
            <input style={{
                flex: 1,
                height: '54px',
                border: '1px solid #C8C8CE',
                borderRadius: '4px',
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0
            }}
                disabled={!editable}
                value={initialValue ?? value}
                onChange={(e) => {
                    // setValue(e.target.value)
                    updateValue(name, e.target.value)
                }}
            />
        </div>
        }
    </div>
}

export default LinkInput;
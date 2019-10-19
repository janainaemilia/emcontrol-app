import React from 'react'
import If from '../operator/if'

export default props => (
	<div className={`search-bar ${props.className}`}>
		<div className='search-components'>
			<div className="search">
				<input {...props.input} className='search-input'
					placeholder={props.placeholder}
			        onChange={props.change} />
			    <button type='button' className='btnFilter'></button>
			</div>
			{props.otherFilters}
			<If test={props.showStateOptions !== false}>
			    <ul className="search-options">
				    <li>
					    <input type='radio' id="1-option" name='status' onClick={props.click} value='ativo'/>
					    <label htmlFor="1-option">Ativos</label>
						<div className="check"><div className="inside"></div></div>
					</li>

				    <li>
					    <input type='radio' id="2-option" name='status' onClick={props.click} value='inativo'/>
					    <label htmlFor="2-option">Inativos</label>
						<div className="check"><div className="inside"></div></div>
					</li>

				    <li>
					    <input type='radio' id="3-option" name='status' onClick={props.click} value='todos' defaultChecked={true}/>
					    <label htmlFor="3-option">Todos</label>
						<div className="check"><div className="inside"></div></div>
					</li>
			    </ul>
			</If>
	    </div>
    </div>
)

// https://codepen.io/AngelaVelasquez/pen/Eypnq
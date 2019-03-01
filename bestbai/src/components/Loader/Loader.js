import React from 'react';

export default function Loader() {
  return (
    <div>
      <div className='loader-container'>
        <div className='loader3'>
          <div className='spinner2'>
            <div className='container-B'>
              <div className='hex0'></div>
              <div className='hex120'></div>
              <div className='hex240'></div>
              <div className='spinner2'>
                <div className='container-B'>
                  <div className='hex0'></div>
                  <div className='hex120'></div>
                  <div className='hex240'></div>
                  <div className='spinner2'>
                    <div className='container-B'>
                      <div className='hex0'></div>
                      <div className='hex120'></div>
                      <div className='hex240'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

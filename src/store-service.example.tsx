import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { exampleSendFieldService } from 'src/services/api/example.service';
import type { TProcessedResponse } from 'src/services/request-base';
import { actionExampleAtom, exampleAtom } from 'src/store/atoms/example.atom';
import { addCount, countAtom, flagAtom } from './store/atoms';

/**
 * This example shows:
 * - Count atom increment on click
 * - Flag atom mutation side effect after counter reaches 3
 * - Logs rerenders to showcase flag component not being constantly rerendered
 */

export function Flag() {
  const flag = useAtomValue(flagAtom);

  useEffect(() => {
    console.log('flag rerendered', flag);
  }, [flag]);

  return <div>FLAG: {JSON.stringify(flag)}</div>;
}

export function Count() {
  const count = useAtomValue(countAtom);

  useEffect(() => {
    console.log('count rerendered', count);
  }, [count]);

  return (
    <div style={{ cursor: 'pointer' }} onClick={() => addCount()}>
      COUNT: {count} (Click to increase)
    </div>
  );
}

/**
 * This example shows:
 * - Atom action request
 * - Raw request using service
 */

const responseCheck = <TRes, TEr>(state: TProcessedResponse<TRes, TEr>) => {
  if (state.data !== null) {
    // state.data.test1
  }

  if (state.error !== null) {
    if (state.error.systemError !== null) {
      // abort/timeout/system error like cors
    }

    if (state.error.reqResValidationError !== null) {
      // zod formatted request body / response body validation error
    }

    if (state.error.errorResponse !== null) {
      if (state.error.errorResponse.data !== null) {
        // schema typed error response
        // state.error.errorResponse.data.message
      }

      if (state.error.errorResponse.validationError !== null) {
        // zod formatted error response body validation error
      }

      if (state.error.errorResponse.raw !== null) {
        // raw error response just in case
      }
    }
  }
};

const examleAtomServiceUsage = () => {
  // atom action request
  const state = useAtomValue(exampleAtom);
  const sendField = useSetAtom(actionExampleAtom);

  const atomSend = () => {
    const abortController = new AbortController();
    sendField({
      data: { test: '1' },
      headers: { 'Custom-Header': 'value' },
      query: new URLSearchParams(),
      signal: abortController.signal,
    });
    // abortController.abort() to cancel request
  };

  if (state.status === 'success') {
    responseCheck(state);
  }

  // raw request using service
  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      const result = await exampleSendFieldService({
        data: { test: '1' },
        headers: { 'Custom-Header': 'value' },
        query: new URLSearchParams(),
        signal: abortController.signal,
      });

      responseCheck(result);
    })();
  }, []);
};

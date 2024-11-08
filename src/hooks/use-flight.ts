import { useQuery, useMutation } from "@apollo/client";
import { ALL_FLIGHTS, FLIGHT_BY_ID } from "../graphql/queries/flightQueries";
import {
  CREATE_FLIGHT,
  UPDATE_FLIGHT,
  DELETE_FLIGHT,
} from "../graphql/mutations/flightMutations";

export const useFlights = () => {
  const { data, loading, error } = useQuery(ALL_FLIGHTS);
  return { flights: data?.allFlights, loading, error };
};

export const useFlightById = (id: string) => {
  const { data, loading, error } = useQuery(FLIGHT_BY_ID, {
    variables: { id },
  });
  return { flight: data?.flightById, loading, error };
};

export const useCreateFlight = () => {
  const [createFlight] = useMutation(CREATE_FLIGHT);
  return createFlight;
};

export const useUpdateFlight = () => {
  const [updateFlight] = useMutation(UPDATE_FLIGHT);
  return updateFlight;
};

export const useDeleteFlight = () => {
  const [deleteFlight] = useMutation(DELETE_FLIGHT);
  return deleteFlight;
};

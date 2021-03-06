import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import { deleteServiceById } from '../../actions/serviceRegistry'
import { connect } from 'react-redux'
import { showModal } from '../../actions/modal'
import EnhancedTableHead from './EnhancedTableHead'
import { getSorting } from '../../utils/utils'

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 600
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row'
  }
})

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)

    const { data, system } = this.props

    this.state = {
      order: 'asc',
      orderBy: system ? 'serviceDefinition' : 'systemName',
      data,
      page: 0,
      rowsPerPage: 10
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleServiceDelete = (serviceId) => () => {
    this.props.deleteServiceById(serviceId)
  }

  handleServiceEdit = (serviceId) => () => {
    this.props.showModal(
      {
        open: true,
        isEdit: true,
        serviceId,
        closeModal: this.closeModal
      },
      'addSREntry'
    )
  }

  render() {
    const { classes, columnData, system } = this.props
    const { data, order, orderBy, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return system ? (
                    <TableRow hover key={n.serviceDefinition}>
                      <TableCell>{n.serviceDefinition}</TableCell>
                      <TableCell>{n.interfaces.join(',')}</TableCell>
                      <TableCell>{n.serviceURI}</TableCell>
                      <TableCell>{n.udp.toString()}</TableCell>
                      <TableCell className={classes.actionCell}>
                        <IconButton
                          color="secondary"
                          aria-label="Edit Entry"
                          onClick={this.handleServiceEdit(n.serviceId)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete Entry"
                          onClick={this.handleServiceDelete(n.serviceId)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow hover key={n.systemName + index}>
                      <TableCell>{n.systemName}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>{n.port}</TableCell>
                      <TableCell>{n.interface}</TableCell>
                      <TableCell>{n.serviceURI}</TableCell>
                      <TableCell>{n.udp.toString()}</TableCell>
                      <TableCell>{n.version}</TableCell>
                      <TableCell className={classes.actionCell}>
                        <IconButton
                          color="secondary"
                          aria-label="Edit Entry"
                          onClick={this.handleServiceEdit(n.serviceId)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete Entry"
                          onClick={this.handleServiceDelete(n.serviceId)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  system: PropTypes.bool,
  deleteServiceById: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    deleteServiceById: (serviceId) => {
      dispatch(deleteServiceById(serviceId))
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(EnhancedTable))
